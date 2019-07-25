import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { nodeRpc1 } from '../../config';
import { decodeBech32, fromWords } from '../lib/bech32';
import { hex } from '../lib/hex';
import { sha256 } from 'js-sha256';
import { skipWhile } from 'rxjs/operators';
import { ApiService } from './api.service';
import { UpdateValidators, UpdateValidatorsMap } from '../state/validators/validators.actions';
import { selectValidators, selectValidatorsState } from '../state/validators/validators.reducers';
import { State } from '../state/index.js';

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
    console.log("Validators Service injected!");
  }

  // NEW LOGIC
  initValidators() {
    this.apiService.fetchValidators$().subscribe((validators: any) => {
      validators.sort((validator1, validator2) => {
        return Number(validator2.tokens) - Number(validator1.tokens);
      });

      for (const i in validators) {
        validators[i].rank = (Number(i) + 1);

        if(validators[i].account.value.coins.length === 0) {
          validators[i].account.value.coins.push({ amount: 0, denom: 'tree' }) 
        }
      }
      this.appStore.dispatch(new UpdateValidators(validators));
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
        this.appStore.dispatch(new UpdateValidatorsMap(this.validatorsMap));
      });
      
  }

  initHexAddress(validator) {
    const hexAddr = this.getHexAddress(validator.consensus_pubkey);
    this.validatorsMap.set(hexAddr, validator.description.moniker);
    this.validatorsMap.set(validator.operator_address, validator.description.moniker);
    if(validator.distribution.operator_address) {
      this.validatorsMap.set(validator.distribution.operator_address, validator.description.moniker);
    }
    this.appStore.dispatch(new UpdateValidatorsMap(this.validatorsMap));
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
    
  getValidatorAvatars(validator) {
    return new Promise(async resolve => {
      validator.keybase = [null];
    });
  }
}
