import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Movie } from '../models/movie';

@Injectable()
export class CommonService {

  constructor() {
  }

  /**
   * Make movies array unique and set the cinema world and film world ids
   * @param {Movie[]} movieArray
   * @public
   */
  public arrayUnique(movieArray: Movie[]): Movie[] {
    const a = movieArray.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i].Title === a[j].Title) {
              // Set the new Id from the newly arrived movie service call
              if (a[j].CinemaWorldId) {
                a[i].CinemaWorldId = a[j].CinemaWorldId;
              }
              if (a[j].FilmWorldId) {
                a[i].FilmWorldId = a[j].FilmWorldId;
              }
              a.splice(j--, 1);
            }
        }
    }
    return a;
  }

  /**
   * Handle generic error from http call
   * @param operation {string}
   * @param result {T}
   */
  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
