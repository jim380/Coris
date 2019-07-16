import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { nodeRpc1,appApi } from '../../config';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../state/index.js';
import { UpdateAtomPrice, UpdateInflation, UpdateStakePool } from '../state/stake/stake.actions.js';

@Injectable({
  providedIn: 'root'
})

export class PricingService {
  constructor(
    private httpClient: HttpClient,
    private appStore: Store <State>
  ) { }

  setAtomPrice() {
    this.getAtomPrice()
    .subscribe(data => {
      // TODO remove debugging
      // console.log(data.data['3794']);
      let price = data.data['3794'].quote.USD.price;
      this.appStore.dispatch(new UpdateAtomPrice(price))
    });
  }

  setInflation() {
    this.getInflation()
    .subscribe(inflation => {
      this.appStore.dispatch(new UpdateInflation(inflation))
    });
  }

  setStakingPool() {
    return new Promise(resolve => {
      this.getStakingPool()
      .subscribe(async data => {
        // TODO remove debugging
        // console.log(data);
        if (data !== null) {
          this.setCommunityPool(data);
        }
        resolve();
      });
    });
  }

  // export interface StakeState {
  //   totalStake: number | null;
  //   stakePool: Pool;
  //   atomPrice: number | string | null;
  //   inflation: number | string | null;
  // };
  
  // export interface Pool {
  //   denom: string | null;
  //   bonded: string | null;
  //   notBonded: string | null;
  //   communityPool: {
  //     amount: string | null;
  //     denom: string | null;
  //   };
  // }
  

  setCommunityPool(stakingPool) {
    return new Promise(resolve => {
      this.getCommunityPool()
      .subscribe(async data => {
        // TODO remove debugging
        // console.log(data);
        if (data !== null) {
          stakingPool.community_pool = data[0];
          this.appStore.dispatch(new UpdateStakePool({
            denom: data[0].denom,
            bonded: stakingPool.bonded_tokens,
            notBonded: stakingPool.not_bonded_tokens,
            communityPool: data[0].amount,
          }));
          // console.log(data[0].amount);
        }
        resolve();
      });
    });
  }

  getAtomPrice():Observable<any> {
    return this.httpClient.get(`${appApi}/marketcap/atom`);
  }

  getInflation():Observable<any> {
    return this.httpClient.get(`${nodeRpc1}/minting/inflation`);
  }

  getStakingPool():Observable<any> {
    return this.httpClient.get(`${nodeRpc1}/staking/pool`);
  }

  getCommunityPool():Observable<any> {
    return this.httpClient.get(`${nodeRpc1}/distribution/community_pool`);
  }
}
