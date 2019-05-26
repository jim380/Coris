import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { nodeRpc1,appApi } from '../../config.js';
import { Observable } from 'rxjs';
import { UpdateStakePool } from '../state/app.actions';
import { Store } from '@ngrx/store';
import { State } from '../state/app.interface.js';

@Injectable({
  providedIn: 'root'
})

export class PricingService {
  constructor(
    private httpClient: HttpClient,
    private appStore: Store <State>
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
          this.appStore.dispatch(new UpdateStakePool(stakingPool));
          // console.log(stakingPool);
        }
        resolve();
      });
    });
  }

}
