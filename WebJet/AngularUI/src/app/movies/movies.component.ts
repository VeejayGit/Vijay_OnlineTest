import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { AppConstants } from '../app.constants';
import { MovieLoadStatus } from '../models/movieLoadStatus';
import { MoviesService } from '../services/movies.service';
import { CommonService } from '../services/common.service';
import { InitTokenService } from '../services/tokenAuthentication.service';
import { Movie } from '../models/movie';
import { MovieServiceSettings } from '../models/movieServiceSettings';
import { MovieLoadingStatus } from '../models/movieLoadingStatus';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public filmWorldLoadStatus: MovieLoadStatus = MovieLoadStatus.loading;
  public cinemaWorldLoadStatus: MovieLoadStatus = MovieLoadStatus.loading;
  public ELEMENT_DATA_MOVIES: Movie[] = [];
  public blankImgUrl: SafeResourceUrl;
  public moviesDataSource = new MatTableDataSource<Movie>(this.ELEMENT_DATA_MOVIES);
  public displayedMovieColumns = AppConstants.DISPLAYED_MOVIES_COLUMNS;
  public services: MovieLoadingStatus[] = [];

  constructor(private moviesService: MoviesService, private commonService: CommonService, private sanitizer: DomSanitizer,
    private initTokenService: InitTokenService) {
    this.blankImgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(AppConstants.BLANK_IMG_PATH);
    this.initTokenService.tokenInitialisedEvent$.subscribe(item => this.getMoviesFromServices());
  }

  ngOnInit() {
    this.initTokenService.initToken();
  }

  /**
   * Get movies from services in constants file then call getMovies() on each service
   * @returns {void}
   * @private
   */
  private getMoviesFromServices(): void {
    for (const service of AppConstants.MOVIE_SERVICES) {
      const newMovieLoadingStatus = new MovieLoadingStatus(service.TITLE, MovieLoadStatus.loading);
      this.services.push(newMovieLoadingStatus);
      this.getMovies(service);
    }
  }

  /**
   * Get movies from web services and add them to the list of movies and set the status
   * @param {MovieServiceSettings} service
   * @returns {void}
   * @private
   */
  private getMovies(service: MovieServiceSettings): void {
    const statusToUpdate = this.services.filter(vari => {
      return vari.Title === service.TITLE;
    })[0];
    this.moviesService.getMovies(service.API_PATH).subscribe(data => {
      if (data) {
        for (const movieUpdate of data.Movies) {
          movieUpdate[service.ID_VARIABLE] = movieUpdate.ID;
          // Update image if it is bad
          this.updateDetailsOfMovies(movieUpdate);
        }
        this.ELEMENT_DATA_MOVIES = this.commonService.arrayUnique(this.ELEMENT_DATA_MOVIES.concat(data.Movies));
        this.moviesDataSource = new MatTableDataSource<Movie>(this.ELEMENT_DATA_MOVIES);
        statusToUpdate.Status = MovieLoadStatus.done;
      } else {
        statusToUpdate.Status = MovieLoadStatus.error;
        // Retry movie service after failed attempt
        setTimeout(() => this.getMovies(service), AppConstants.RELOAD_SERVICE_TIMEOUT);
      }
    });
  }

  /**
   * Update details of movies - in particular a broken poster image
   * @param {Movie} movieUpdate
   * @returns {void}
   * @private
   */
  private updateDetailsOfMovies(movieUpdate: Movie): void {
    for (const movie of this.ELEMENT_DATA_MOVIES) {
      if (movie.Title === movieUpdate.Title && movie.BadImage) {
        movie.Poster = movieUpdate.Poster;
        movie.BadImage = false;
      }
    }
  }
}
