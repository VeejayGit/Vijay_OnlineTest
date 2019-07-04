import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatTableDataSource, MatSort } from '@angular/material';

import { MoviesService } from '../services/movies.service';
import { InitTokenService } from '../services/tokenAuthentication.service';
import { Movie } from '../models/movie';
import { MovieDetails } from '../models/movieDetails';
import { AppConstants } from '../app.constants';
import { MovieLoadStatus } from '../models/movieLoadStatus';
import { MovieServiceSettings } from '../models/movieServiceSettings';
import { MovieLoadingStatus } from '../models/movieLoadingStatus';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})

export class MovieComponent implements OnInit {

  public filmWorldLoadStatus: MovieLoadStatus = MovieLoadStatus.loading;
  public cinemaWorldLoadStatus: MovieLoadStatus = MovieLoadStatus.loading;
  public CinemaWorldId: string;
  public FilmWorldId: string;
  public ELEMENT_DATA_MOVIES: MovieDetails[] = [];
  public moviesDataSource = new MatTableDataSource<MovieDetails>(this.ELEMENT_DATA_MOVIES);
  public displayedMovieColumns = AppConstants.DISPLAYED_MOVIE_COLUMNS;
  public movieImgUrl: string;
  public cheapestPriceMovie: MovieDetails;
  public movieModel: MovieDetails;
  public blankImgUrl: SafeResourceUrl;
  public services: MovieLoadingStatus[] = [];

  constructor(private route: ActivatedRoute, private moviesService: MoviesService, private sanitizer: DomSanitizer,
      private initTokenService: InitTokenService) {
    this.blankImgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(AppConstants.BLANK_IMG_PATH);
    this.route.queryParams.subscribe(params => {
      for (const service of AppConstants.MOVIE_SERVICES) {
        this[service.ID_VARIABLE] = params[service.ID_VARIABLE];
      }
    });
    this.movieImgUrl = '';
    this.initTokenService.tokenInitialisedEvent$.subscribe(item => this.getMovieFromServices());
  }

  ngOnInit() {
    this.initTokenService.initToken();
  }

  /**
   * Sort the movies by price and set the cheapest movie service provider
   * @returns {void}
   * @private
   */
  private sortMovies(): void {
    this.ELEMENT_DATA_MOVIES = this.ELEMENT_DATA_MOVIES.sort((a, b) => {
      if (a.Price < b.Price) {
        this.cheapestPriceMovie = b;
        return 1;
      } else if (a.Price > b.Price) {
        this.cheapestPriceMovie = a;
        return -1;
      } else {
        this.cheapestPriceMovie = b;
        return 0;
      }
    });
  }

  /**
   * Get the movie from all of the movie source
   * @returns {void}
   * @private
   */
  private getMovieFromServices(): void {
    for (const service of AppConstants.MOVIE_SERVICES) {
      const newMovieLoadingStatus = new MovieLoadingStatus(service.TITLE, MovieLoadStatus.loading);
      this.services.push(newMovieLoadingStatus);
      if (this[service.ID_VARIABLE]) {
        this.getMovie(service);
      }
    }
  }

  /**
   * Get movie from web service and update dom
   * @param {MovieServiceSettings} service
   * @returns {void}
   * @private
   */
  private getMovie(service: MovieServiceSettings): void {
    const statusToUpdate = this.services.filter(vari => {
      return vari.Title === service.TITLE;
    })[0];
    statusToUpdate.Status = MovieLoadStatus.loading;
    this.moviesService.getMovie(service.API_PATH, this[service.ID_VARIABLE]).subscribe(data => {
      if (data) {
        data.MovieServiceTitle = service.TITLE;
        if (!this.movieModel) {
          this.movieModel = data;
          this.cheapestPriceMovie = data;
        }
        this.ELEMENT_DATA_MOVIES = this.ELEMENT_DATA_MOVIES.concat(data);
        this.updateMovieDetails(data);
        this.sortMovies();
        this.moviesDataSource = new MatTableDataSource<MovieDetails>(this.ELEMENT_DATA_MOVIES);
        statusToUpdate.Status = MovieLoadStatus.done;
      } else {
        statusToUpdate.Status = MovieLoadStatus.error;
        setTimeout(() => this.getMovie(service), AppConstants.RELOAD_SERVICE_TIMEOUT);
      }
    });
  }

  /**
   * Update the movie details if any is missing and update image url to a new url if current one is broken
   * @param {MovieDetails} movieDetailsUpdate
   * @return {void}
   * @private
   */
  private updateMovieDetails(movieDetailsUpdate: MovieDetails): void {
    if (this.movieModel.Title === movieDetailsUpdate.Title) {
      // Update image if it is bad
      if (this.movieModel.BadImage) {
        this.movieModel.Poster = movieDetailsUpdate.Poster;
        this.movieModel.BadImage = false;
      }
      // Update awards if they are missing
      if (!this.movieModel.Awards) {
        this.movieModel.Awards = movieDetailsUpdate.Awards;
      }
    }
  }
}
