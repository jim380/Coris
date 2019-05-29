import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, range, of, from, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UpdateValsMap } from '../state/app.actions';
import { nodeRpc1 } from '../../config.js';
import { decodeBech32, fromWords } from '../lib/bech32';
import { hex } from '../lib/hex';
import { sha256 } from 'js-sha256';
import { map, mergeMap, catchError, concatAll, skipWhile } from 'rxjs/operators';
import { ApiService } from './api.service';
import { AppState, State } from '../state/app.interface';
import { UpdateValidators } from '../state/validators/validators.actions';
import { selectValidators, selectValidatorsState } from '../state/validators/validators.reducers';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  validatorsStore = []; 
  validatorsMap: Map<string, string> = new Map();

  constructor(
    private appStore: Store <State>,
    private http: HttpClient,
    private apiService: ApiService
  ) {
    console.log("Validators Seervice injected!");
    this.initValidators();
  }

  // NEW LOGIC
  initValidators() {
    this.apiService.fetchValidators$().subscribe((validators: any) => {
      validators.sort((validator1, validator2) => {
        return Number(validator2.tokens) - Number(validator1.tokens);
      });

      for (const i in validators) {
        validators[i].rank = (Number(i) + 1);

        // TODO @aakatev 5/28/19
        // Do this mapping on backend
        if(validators[i].account.tokens === 0) {
          validators[i].account = { type: null, value: null }
        } else if (
          validators[i].account.type === "auth/DelayedVestingAccount"
        ) {
          validators[i].account.value = validators[i].account.value.BaseVestingAccount.BaseAccount; 
        }

        console.log(validators[i].account)
      }
      // console.log(validators);
      this.appStore.dispatch( new UpdateValidators(validators) );
    });

    this.appStore
      .select(selectValidators)
      .pipe(skipWhile(validators => validators.length === 0))
      .subscribe((validators) => { 
        for (const validator of validators) {
          this.initHexAddress(validator);
        }
      },
      (error) => { },
      () => {
        this.appStore.dispatch(new UpdateValsMap(this.validatorsMap));
      });
      
  }

  initHexAddress(validator) {
    const hexAddr = this.getHexAddress(validator.consensus_pubkey);
    this.validatorsMap.set(hexAddr, validator.description.moniker);
    this.validatorsMap.set(validator.operator_address, validator.description.moniker);
    if(validator.distribution.operator_address) {
      this.validatorsMap.set(validator.distribution.operator_address, validator.description.moniker);
    }
    this.appStore.dispatch(new UpdateValsMap(this.validatorsMap));
  }

  getHexAddress(pubKey) {
    const decodedPubkey = decodeBech32(pubKey);
    const pubKeyHex = hex.bytesToHex(fromWords(decodedPubkey.words)).substr(10);
    return this.hashSha256(pubKeyHex).substr(0, 40);
  }

  hashSha256(pubkey) {
    const hash = sha256.create();
    const bytes = hex.hexToBytes(pubkey);
    hash.update(bytes);
    return hash.hex().toUpperCase();
  }

  getValidators() {
    return this.http.get(`${nodeRpc1}/staking/validators`);
  }

  getValidatorDistribution(address) {
    return this.http.get(`${nodeRpc1}/distribution/validators/${address}`);
  }

  getValidatorDelegations(address) {
    return this.http.get(`${nodeRpc1}/staking/validators/${address}/delegations`);
  }

  getAccountBalance(address) {
    return this.http.get(`${nodeRpc1}/bank/balances/${address}`);
  }
  
  // @aakatev
  // TODO
  // Move on back end
  getValidatorAvatars(validator) {
    return new Promise(async resolve => {
      // TODO @aakatev
      // Comment out later after setting up keybase auth
      //
      // let regex = await validator.description.moniker.replace(/\s/g, '').match(/[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]*/i)[0];
      // this.http.get(`https://keybase.io/_/api/1.0/user/lookup.json?usernames=${regex}&fields=pictures`)
      //   .subscribe(async data => {
      //     // Debugging
      //     // console.log(`https://keybase.io/_/api/1.0/user/lookup.json?usernames=${validator.data.description.moniker.replace(/\s/g, '')}&fields=pictures`);
      //     // console.log(data['them']);
      //     // Debugging regex to parse moniker
      //     // console.log(validator.data.description.moniker.replace(/\s/g, '').match(/[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]*/i)[0]);
      //     if (data['status'].code === 0) {
      //       validator.keybase = data['them'];
      //       if(data['them'][0] !== null && data['them'][0].pictures !== undefined) {
      //         validator.picture = data['them'][0].pictures.primary.url;
      //       }
      //     } else {
      //       validator.keybase = [null];
      //     }
      //     resolve();
      //   });
      // End comment out later
      validator.keybase = [null];
    });
  }

  // TOFIX @aakatev 
  // remove or move to back end
  // calculateTotalVotingPower() {
  //   return new Promise (async resolve => {
  //     for (const validator of this.validatorsStore) {
  //       this.totalStake += await Number(validator['tokens']);
  //       this.appStore.dispatch(new UpdateTotalStake(this.totalStake));
  //       // TODO remove debugging
  //       // console.log(this.totalStake);
  //     }
  //     resolve();
  //   });
  // }
}
