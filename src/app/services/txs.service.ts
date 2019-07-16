import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
import { nodeRpc1, nodeRpc2 } from '../../config'


@Injectable({
  providedIn: 'root'
})
export class TxsService {

  constructor(private http: HttpClient) { }
  
  public getTxsAtBlock(height: number) {
    return this.http.get(`${nodeRpc2}/tx_search?query="tx.height=${height}"`);
  }

  public getTxByHash(hash: string) {
    return this.http.get(`${nodeRpc1}/txs/${hash}`);
  }

  // sender is an account in cosmos-prefix format
  // e.g. cosmos1msy0nwz3q5ky9sj539mutajqye934sl2wexmaf
  public getTransferTxs(sender: string, limit: number, page: number) {
    // TODO remove debugging
    // console.log(`${nodeRpc1}/txs?sender=${sender}&limit=${limit}&page=${page}`);
    return this.http.get(`${nodeRpc1}/txs?sender=${sender}&limit=${limit}&page=${page}`);
  }

  // @aakatev 
  // Very slow, not recommended to run on front end
  public getAllTransferTxs(sender:string) {
    return new Promise (async resolve => {
      let transfer_txs = await this.getTransferTxsPromise(sender, 100, 1);
      resolve(transfer_txs);
    }).catch(error => {
      console.log(error);
    });
  }

  private getTransferTxsPromise(sender: string, limit: number, page: number) {
    return new Promise(resolve => {
      this.http.get(`${nodeRpc1}/txs?sender=${sender}&limit=${limit}&page=${page}`)
      .toPromise().then( async (response: any) => {
        if(response.length < 100) {
          resolve(response);
        } else {
          let txs_part = await this.getTransferTxsPromise(sender, limit, ++page);
          resolve(
            response.concat(txs_part)
          );
        }
      }).catch(error => {
        console.log(error);
        resolve(null);
      });
    });
  }

  // delegator is an account in cosmos-prefix format
  // e.g. cosmos1msy0nwz3q5ky9sj539mutajqye934sl2wexmaf
  // ONLY RETURNS LAST 100 TXS
  public getStakingTxs(delegator: string) {
    return this.http.get(`${nodeRpc1}/staking/delegators/${delegator}/txs`);
  }

  public getDelegations(delegator: string) {
    return this.http.get(`${nodeRpc1}/staking/delegators/${delegator}/delegations`);
  }

  public getUnbondingDelegations(delegator: string) {
    return this.http.get(`${nodeRpc1}/staking/delegators/${delegator}/unbonding_delegations`);
  }

  public getRedelegations(delegator: string) {
    return this.http.get(`${nodeRpc1}/staking/redelegations?delegator=${delegator}`);
  }

  public getDelegatorValidators(delegator: string) {
    return this.http.get(`${nodeRpc1}/staking/delegators/${delegator}/validators`);
  }

  public getDelegatorRewards(delegator: string) {
    return this.http.get(`${nodeRpc1}/distribution/delegators/${delegator}/rewards`);
  }

  public getAccountInfo(delegator: string) {
    return this.http.get(`${nodeRpc1}/auth/accounts/${delegator}`);
  }

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
        // TODO remove debugging
        // console.log(val);
        resolve(val);
      },
      error => {
        // TODO remove debugging
        // console.log(error);
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