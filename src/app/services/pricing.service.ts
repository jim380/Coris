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
  getInflation():Observable<any> {
    // @aakatev inflation using stargate enpoint,
    // TODO figuire out why our node doesnt expose endpoint
    // return this.httpClient.get(`${nodeRpc1}/minting/parameters`);
    return this.httpClient.get(`https://stargate.cosmos.network/minting/inflation`);
  }

}
