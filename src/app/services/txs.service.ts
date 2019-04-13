import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
import { nodeRpc1 } from '../../config.js'


@Injectable({
  providedIn: 'root'
})
export class TxsService {

  constructor(private http: HttpClient) { }


  public postData(delegatorAddr: string) {
    
    return new Promise(resolve => {

    const postOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    const postBody =  {
      "base_req": {
        "from": `${delegatorAddr}`,
        "memo": "test",
        "chain_id": "gaia-13002",
        "account_number": "0",
        "sequence": "1",
        "gas": "200000",
        "gas_adjustment": "1.2",
        "fees": [
          {
            "denom": "muon",
            "amount": "50000"
          }
        ],
        "simulate": false
      },
      "delegator_address": `${delegatorAddr}`,
      "validator_address": "cosmosvaloper1yds9h4lqn0xggm3kahn0vznhv59cljjlfh3sa2",
      "delegation": {
        "denom": "muon",
        "amount": "100000"
      }
    }

    this.http.post(`${nodeRpc1}/staking/delegators/${delegatorAddr}/delegations`, postBody, postOptions)
    .subscribe(
      (val) => {
        // @aakatev debugging
        console.log(val);
        resolve(val);
      },
      error => {
        console.log(error);
      },
      () => {});
    });
  }
}


// nginx angular POST proxy example
// # node 1317 proxy
// location /node_txs/ 
//     {
//     if ($request_method = 'OPTIONS') 
//     {
//         add_header 'Access-Control-Allow-Origin' '*';
//         add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
//         #
//         # Custom headers and headers various browsers *should* be OK with but aren't
//         #
//         add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
//         #
//         # Tell client that this pre-flight info is valid for 20 days
//         #
//         add_header 'Access-Control-Max-Age' 1728000;
//         add_header 'Content-Type' 'text/plain; charset=utf-8';
//         add_header 'Content-Length' 0;
//         return 204;
//     }

//     add_header 'Access-Control-Allow-Origin' '*' always; 
//     add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
//     add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range' always;
//     add_header 'Access-Control-Allow-Credentials' 'true' always;
//     add_header 'Access-Control-Max-Age' '1728000';
//     add_header 'Content-Type' 'text/plain charset=UTF-8' always;
//     #add_header 'Content-Length' '0';
//     proxy_pass http://149.28.228.142:1317/;
//     #proxy_http_version 1.1;
//     #proxy_set_header Upgrade $http_upgrade;
//     #proxy_set_header Connection "Upgrade";
// }
// End nginx angular POST proxy example