import {Injectable} from '@angular/core';
import {HttpHeaders } from '@angular/common/http';

@Injectable()

export class HttpHeaderService {

    /**
     * Create http call headers with token authentication header
     * @param {string} token
     * @returns {HttpHeaders}
     * @public
     */
    public createHeaders(token: string): HttpHeaders {
        return new HttpHeaders({
            'Authorization': 'bearer ' + token
        });
    }

    /**
     * Create http call headers with call to create new token
     * @returns {HttpHeaders}
     * @public
     */
    public createTokenHeaders(): HttpHeaders {
        return new HttpHeaders({
            'grant_type': 'password'
        });
    }
}
