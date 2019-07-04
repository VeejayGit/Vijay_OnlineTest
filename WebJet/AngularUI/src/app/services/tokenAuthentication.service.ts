import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { HttpHeaderService } from './httpHeader.service';
import { CommonService } from './common.service';
import { AppConstants } from '../app.constants';
import { TokenModel } from '../models/auth/token-model';

@Injectable()
export class InitTokenService implements OnInit  {
  public token: TokenModel;
  public tokenInitialisedEvent$: EventEmitter<TokenModel>;

  constructor(private http: HttpClient,
    private headerService: HttpHeaderService, private commonService: CommonService) {
      this.tokenInitialisedEvent$ = new EventEmitter();
  }

  ngOnInit(): void {
    this.initToken();
  }

  /***
   * Check the token at entry page, if valid, set token to local storage. fail redirect
   * @return {Promise<boolean>}
   * @public
   */
  public validateToken(): Promise<boolean> {
    let tokenStillValid = true;
    // todo check to see locally that the expiry time hasn't passed and if it has perform token regeneration rath than below server call

    return this.http.post(AppConstants.API_URL.BASE + AppConstants.API_URL.AUTHORIZE, AppConstants.HTTP_BODY_REQUEST,
      { headers: this.headerService.createHeaders(this.token.access_token) }).toPromise().then(response => {
      console.log('reponse: ', response);
      if (response !== 'Authenticated') {
        tokenStillValid = false;
      }
      if (!tokenStillValid) {
        // This renews token if it has expired
        return this.clearToken();
      }
      return true;
    }).catch(err => {
      return this.clearToken();
    });
  }

  /**
   * Initialise the authentication token
   * @returns {void}
   * @public
   */
  public initToken(): void {
    this.http.post<TokenModel>(AppConstants.API_URL.BASE + AppConstants.API_URL.TOKEN, AppConstants.HTTP_BODY_REQUEST,
      { headers: this.headerService.createTokenHeaders() })
      .subscribe(response => this.updateToken(response));
  }

  /**
   * Clears out token from local storage and re-initialises token
   * @returns {boolean}
   * @private
   */
  private clearToken(): boolean {
    localStorage.removeItem('authData');
    this.initToken();
    return false;
  }

  /**
   * Authorizes the user by setting the authentication token in local storage
   * @param {string} token The authentication token.
   * @returns {void}
   * @private
   */
  private authorizeUser(tokenModel: TokenModel): void {
    localStorage.setItem('authData', JSON.stringify(tokenModel));
  }

  /**
   * Update the token upon successful initialisation
   * @param {TokenModel} token
   * @returns {void}
   * @private
   */
  private updateToken(token: TokenModel): void {
    this.token = token;
    this.authorizeUser(this.token);
    this.tokenInitialisedEvent$.emit();
  }
}
