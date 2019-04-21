import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { nodeRpc1,appApi } from '../../config.js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PricingService {
  constructor(private httpClient: HttpClient) { }

  getAtomPrice():Observable<any> {
    return this.httpClient.get(appApi);
  }
  getMinting():Observable<any> {
    return this.httpClient.get(`${nodeRpc1}/minting/parameters`);
  }

}
