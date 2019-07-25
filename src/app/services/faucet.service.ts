import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from '../state';
import { Store } from '@ngrx/store';
import { nodeRpc1, faucetRpc } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class FaucetService {

  constructor(
    private httpClient: HttpClient,
    private appStore: Store<State>
  ) { }

  getAccount(address) {
    return this.httpClient.get(`${nodeRpc1}/auth/accounts/${address}`);
  }

  postFaucet(address) {
    return this.httpClient.post(`${faucetRpc}/faucet/request`, { recipient: address });
  }

}
