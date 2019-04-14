import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as AppActions from '../state/app.actions';
import { nodeRpc1 } from '../../config.js'
import { decodeBech32, fromWords } from '../lib/bech32';
import { hex } from '../lib/hex';
import { sha256 } from 'js-sha256';
import { State } from '../interfaces/state.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  totalStake = 0;
  validatorsStore = null;
  validatorsMap: Map<string, string> = new Map;

  numOfValidators = 0;
  MAX_STORE_INDEX = 10;

  constructor(
    private store: Store <State>,
    private http: HttpClient) {
      this.initValidators();
  }

  getTotalStake() { return this.totalStake; }

  setValidators(validators) {
    this.validatorsStore = validators;
    this.store.dispatch(new AppActions.UpdateValidators(this.validatorsStore));
  }

  setStakingPool() {
    return new Promise(resolve => {
        this.http.get(`${nodeRpc1}/staking/pool`).subscribe(async data => {
        // TODO remove debugging
        // console.log(data);
        if (data !== null) {
          this.store.dispatch(new AppActions.UpdateStakePool(data));
        }
        resolve();
      });
    });
  }

  updateValidators() {
    this.store.dispatch(new AppActions.UpdateValidators(this.validatorsStore));
    this.store.dispatch(new AppActions.UpdateValsMap(this.validatorsMap));
    // TODO remove debugging
    // console.log(this.validatorsStore);
    // console.log(this.validatorsMap);
  }


  getValidatorsDetails() {
    return new Promise(resolve => {
        this.http.get(`${nodeRpc1}/staking/validators`).subscribe(async data => {
        // TODO remove debugging
        // console.log(data);
        if (data !== null) {
          this.setValidators(data);
        }
        resolve();
      });
    });
  }

  getValidatorsRanking() {
    return new Promise(resolve => {
      this.http.get(`${nodeRpc1}/validatorsets/latest`).subscribe(data => {
        // TODO remove debugging
        // console.log(data);
        if (data !== null) {
          this.mergeProperties(this.validatorsStore, 'consensus_pubkey', data['validators'], 'pub_key', 'ranking')
            .then(() => {
              this.updateValidators();
              resolve();
            });
        } else {
          resolve();
        }
      });
    });
  }

  mergeProperties(targetArray, targetArrayProperty, propertyArray, propertyArrayProperty, propertyName) {
    return new Promise(resolve => {
      for (const targetIndex in targetArray) {
        for (const propertyIndex in propertyArray) {
          if (propertyArray[propertyIndex][propertyArrayProperty] === targetArray[targetIndex][targetArrayProperty]) {
            targetArray[targetIndex][propertyName] = propertyArray[propertyIndex];
            // TODO remove debugging
            // console.log(targetArray[targetIndex]);
          }
        }
      }
      resolve();
    });
  }

  getValidatorSlashing(validator) {
    return new Promise(resolve => {
      this.http.get(`${nodeRpc1}/slashing/validators/${validator.consensus_pubkey}/signing_info`)
        .subscribe(data => {
          // TODO remove debugging
          // console.log(data);
          validator.slashing = data;
          resolve();
        });
    });
  }

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

  getValidatorHex(validator) {
    return new Promise(async resolve => {
      const hexAddr = await this.getHexAddress(validator['consensus_pubkey']);
      validator['hex_address'] = hexAddr;
      this.validatorsMap.set(hexAddr, validator['description'].moniker);
      resolve();
    });
  }

  getValidatorDelegations(validator) {
    return new Promise(resolve => {
      this.http.get(`${nodeRpc1}/staking/validators/${this.validatorsStore[validator].operator_address}/delegations`)
        .subscribe(data => {
          // TODO remove debugging
          // console.log(data);
          this.validatorsStore[validator].delegations = data;
          resolve();
        });
    });
  }

  async initValidators() {
    await this.getValidatorsDetails();
    await this.getValidatorsRanking();

    this.validatorsStore.forEach(async validator => {
      await this.getValidatorSlashing(validator);
    });

    this.validatorsStore.forEach(async validator => {
      await this.getValidatorAvatars(validator);
    });

    this.validatorsStore.forEach(async validator => {
      await this.getValidatorHex(validator);
    });

    await this.calculateTotalVotingPower();

    // TODO @aakatev decide on version
    // Async version
    // await this.asyncGetDelegations().then(done => {
    //   console.log('All delegators loaded');
    // });
    // Nonasync version
    await this.setStakingPool();

    this.getDelegations();

    // TODO remove debugging
    console.log('Validators init completed!');

    this.updateValidators();
  }
  // End validators mapping

  asyncGetDelegations() {
    return new Promise (async resolve => {
      for (const validator in this.validatorsStore) {
        // TODO remove debugging
        // console.log(this.validatorsStore[validator]);
        await this.getValidatorDelegations(validator);
      }
      resolve();
    });
  }

  getDelegations() {
    return new Promise (async resolve => {
      for (const validator in this.validatorsStore) {
        // TODO remove debugging
        // console.log(this.validatorsStore[validator]);
        this.getValidatorDelegations(validator);
      }
      resolve();
    });
  }

  calculateTotalVotingPower() {
    return new Promise (async resolve => {
      for (const validator of this.validatorsStore) {
        this.totalStake += await Number(validator['tokens']);
        this.store.dispatch(new AppActions.UpdateTotalStake(this.totalStake));
        // TODO remove debugging
        // console.log(this.totalStake);
      }
      resolve();
    });
  }


  sortValidatorsNumber(property, direction) {
    this.validatorsStore.sort((a, b) =>
      direction ? parseFloat(b[property]) - parseFloat(a[property]) : parseFloat(b[property]) + parseFloat(a[property])
    );
    this.updateValidators();
  }


  sortValidatorsString(property, direction) {
    this.validatorsStore.sort((a, b) =>
      direction ?
      b['description'][property] > a['description'][property] :
      b['description'][property] < a['description'][property]
    );
    this.updateValidators();
  }

}
