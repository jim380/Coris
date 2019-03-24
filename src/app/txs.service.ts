import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { nodeRpc, nodeWs, nodeRpcTest } from '../config.js'


@Injectable({
  providedIn: 'root'
})
export class TxsService {

  constructor(private http: HttpClient) {
    this.postData('cosmos1pjmngrwcsatsuyy8m3qrunaun67sr9x78qhlvr');
  }

  public postData(addr: string): void {
  // public PostData(data: any): Observable<any> {

    const postOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }

    const postBody =  {
      "base_req": {
        "from": `${addr}`,
        "memo": "test",
        "chain_id": "gaia-13002",
        "account_number": "0",
        "sequence": "1",
        "gas": "200000",
        "gas_adjustment": "1.2",
        "fees": [
          {
            "denom": "muon",
            "amount": "10000"
          }
        ],
        "simulate": false
      },
      "title": "test",
      "description": "test",
      "proposal_type": "text",
      "proposer": `${addr}`,
      "initial_deposit": [
        {
          "denom": "muon",
          "amount": "10000"
        }
      ]
    }

    // this.http.post(`http://149.28.228.142:1317/staking/delegators/${addr}/delegations`, postBody, postOptions)
    this.http.post(`https://aakatev.me/node_txs/staking/delegators/${addr}/delegations`, postBody, postOptions)
    .subscribe(
      (val) => {
        console.log("POST call successful value returned in body", val);
      },
      error => {
        console.log("POST call in error", error);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
    }

  public newFunc() {
    this.http.get(`${nodeRpc}/block?height=50`).subscribe(data => {
      console.log(data);
    });
  }
}
