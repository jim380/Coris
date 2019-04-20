import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { appApi } from '../../config.js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// see reference: https://coinmarketcap.com/api/documentation/v1/
export class PricingService {
    constructor(private httpClient: HttpClient) { }

    getPrice():Observable<any> {
      return this.httpClient.get(appApi);
    }
}
