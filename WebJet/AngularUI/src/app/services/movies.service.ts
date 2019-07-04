import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Movie } from '../models/movie';
import { Movies } from '../models/movies';
import { MovieDetails } from '../models/movieDetails';
import { AppConstants } from '../app.constants';
import { CommonService } from '../services/common.service';
import { InitTokenService } from '../services/tokenAuthentication.service';
import { HttpHeaderService } from '../services/httpHeader.service';

@Injectable()
export class MoviesService {

  constructor(private http: HttpClient, private commonService: CommonService, private initTokenService: InitTokenService,
    private httpHeaderService: HttpHeaderService) {
  }

  /**
   * Get movies from service http call
   * @param moviesService {string}
   * @returns {Observable<Movies>}
   */
  public getMovies(moviesService: string): Observable<Movies> {
    return this.http.get<Movies>(AppConstants.API_URL.BASE + AppConstants.API_URL.MOVIES
      + moviesService, { headers: this.httpHeaderService.createHeaders(this.initTokenService.token.access_token)}).pipe(
      tap(_ => console.log(`fetched Movies`)),
      catchError(this.commonService.handleError<Movies>(`get Movies`))
    );
  }

  /**
   * Get movie from service http call
   * @param moviesService {string}
   * @param movieId {string}
   */
  public getMovie(moviesService: string, movieId: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(AppConstants.API_URL.BASE + AppConstants.API_URL.MOVIES
        + moviesService + '/movie/' + movieId,
        { headers: this.httpHeaderService.createHeaders(this.initTokenService.token.access_token)}).pipe(
      tap(_ => console.log(`fetched Movie`)),
      catchError(this.commonService.handleError<MovieDetails>(`get Movie`))
    );
  }
}
