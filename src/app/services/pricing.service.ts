import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { nodeRpc1,appApi } from '../../config.js';
import { Observable } from 'rxjs';
import * as AppActions from '../state/app.actions';
import { State } from '../interfaces/state.interface.js';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})

export class PricingService {
  appState: Observable<State>;

  constructor(
    private httpClient: HttpClient,
    private store: Store <State>
  ) { }

  getAtomPrice():Observable<any> {
    return this.httpClient.get(`${appApi}/marketcap/atom`);
  }
  getInflation():Observable<any> {
    return this.httpClient.get(`${nodeRpc1}/minting/inflation`);
  }

  initStakingPool() {
    return new Promise(resolve => {
      this.httpClient.get(`${nodeRpc1}/staking/pool`).subscribe(async data => {
        // TODO remove debugging
        // console.log(data);
        if (data !== null) {
          this.initCommunityPool(data);
        }
        resolve();
      });
    });
  }

  initCommunityPool(stakingPool) {
    return new Promise(resolve => {
      this.httpClient.get(`${nodeRpc1}/distribution/community_pool`).subscribe(async data => {
        // TODO remove debugging
        // console.log(data);
        if (data !== null) {
          stakingPool.community_pool = data[0];
          this.store.dispatch(new AppActions.UpdateStakePool(stakingPool));
          // console.log(stakingPool);
        }
        resolve();
      });
    });
  }

}
