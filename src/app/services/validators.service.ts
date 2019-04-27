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

  constructor(
    private store: Store <State>,
    private http: HttpClient) {
      this.initValidators();
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

    this.validatorsStore.forEach(async validator => {
      await this.getValidatorDistribution(validator);
    });

    this.validatorsStore.forEach(async validator => {
      await this.getValidatorOutstandingRewards(validator);
    });


    this.validatorsStore.forEach(async validator => {
      await this.getValidatorUnbondDelegations(validator);
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
    this.validatorsStore.serviceLoaded = 1;

    this.updateValidators();
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
    console.log(this.validatorsStore);
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

  getValidatorDistribution(validator) {
    return new Promise(resolve => {
      this.http.get(`${nodeRpc1}/distribution/validators/${validator.operator_address}`)
        .subscribe(
          (data) => {
            // TODO remove debugging
            // console.log(data);
            validator.distribution = data;

            this.http.get(`${nodeRpc1}/auth/accounts/${data['operator_address']}`)
              .subscribe(data => {
                validator.account = data;
                resolve();
              })
      
          },
          (error) => {
            // TODO remove debugging
            // console.log(error);
            validator.distribution = null;
            resolve();
          }
        );
    });
  }
  
  getValidatorOutstandingRewards(validator) {
    return new Promise(resolve => {
      this.http.get(`${nodeRpc1}/distribution/validators/${validator.operator_address}/outstanding_rewards`)
        .subscribe(
          (data) => {
            // TODO remove debugging
            // console.log(data);
            validator.outstandning_rewards = data;
            resolve();
          },
          (error) => {
            // TODO remove debugging
            // console.log(error);
            validator.outstandning_rewards = null;
            resolve();
          }
        );
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

  getValidatorDelegations(validatorIndex) {
    return new Promise(resolve => {
      this.http.get(`${nodeRpc1}/staking/validators/${this.validatorsStore[validatorIndex].operator_address}/delegations`)
        .subscribe((data: Array<any>) => {
          let validator = this.validatorsStore[validatorIndex];
          validator.delegations = data;
          validator.self_bond = 0;
          
          if(data && validator.account) {
            data.forEach(delegation => {
              switch (validator.account.type) {
                case "auth/Account": {
                  if(!validator.account.tokens && validator.account.value.coins) {
                    // TODO remove debugging
                    // console.log(validator.account.value.coins[0].amount);
                    validator.account.tokens = validator.account.value.coins[0].amount;
                  }
                  if(delegation.delegator_address === validator.account.value.address) {
                    // TODO remove debugging
                    // console.log('triggered auth: ', delegation.shares);
                    validator.self_bond += Number(delegation.shares);
                  } 
                  break;
                }
                case "auth/DelayedVestingAccount": {
                  if(!validator.account.tokens && validator.account.value.BaseVestingAccount.BaseAccount.coins) {
                    // TODO remove debugging
                    // console.log(validator.account.value.BaseVestingAccount.BaseAccount.coins);
                    validator.account.tokens = validator.account.value.BaseVestingAccount.BaseAccount.coins[0].amount;
                  }

                  if(delegation.delegator_address === validator.account.value.address) {
                    // TODO remove debugging
                    // console.log('triggered vest', delegation.shares);
                    validator.self_bond += Number(delegation.shares);
                  } 
                  break;
                }
                default:{
                  // TODO remove debugging
                  console.log('Unknown account type: ', validator.account.type);
                  break;
                }
              }
            });  
          }
          resolve();
        });
    });
  }

  getValidatorUnbondDelegations(validator) {
    return new Promise(resolve => {
      this.http.get(`${nodeRpc1}/staking/validators/${validator.operator_address}/unbonding_delegations`)
        .subscribe(data => {
          // TODO remove debugging
          // console.log(data);
          validator.unbonding_delegations = data;
          resolve();
        });
    });
  }

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
}
