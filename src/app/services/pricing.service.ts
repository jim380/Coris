import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// see reference: https://coinmarketcap.com/api/documentation/v1/
export class PricingService {

    results: any;
    constructor(private httpClient: HttpClient) {}

    getPrice() {
      this.httpClient.get<any>('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info', {
        observe: 'body',
        responseType: 'json',
        headers: {
          'X-CMC_PRO_API_KEY': '568f2fe9-29d5-415b-b806-03aaa6bbab2a' // API key removed for obv reasons
        },
        params: new HttpParams().set('symbol', 'ATOM')
      })
        .subscribe(
          (response: any) => {
            // TODO remove debugging
            console.log(response);
            return this.results = response;
          }
        );
    }
}
