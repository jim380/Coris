import { Injectable, HttpService } from '@nestjs/common';
import { filter, map } from 'rxjs/operators';

import * as http from 'http';
import * as fs from 'fs';
import { range } from 'rxjs';

export const nodeRpc1 = "http://149.28.228.142:1317"; 

@Injectable()
export class ValidatorsService {
  httpAgent = new http.Agent({ maxSockets: 15, keepAlive: true });
  
  validatorsStore = null;
  validatorsMap: Map<string, string> = new Map;

  numOfValidators = 0;

  constructor(
    private readonly httpService: HttpService
  ) {
    this.initValidators();
  }

  async initValidators() { 
    await this.getValidatorsDetails();

    for(let validator of this.validatorsStore) {
      this.getValidatorSlashing(validator);
      this.getValidatorOutstandingRewards(validator);
      this.getValidatorRewards(validator);
      this.getValidatorUnbondDelegations(validator);
    }

    let validatorsPromises = [];

    for (let i = 0; i < this.validatorsStore.length; i++) {
      validatorsPromises.push(this.getValidatorDistribution(this.validatorsStore[i]));
    }

    Promise.all(validatorsPromises).then(()=> {
      this.triggerDelegations()
    });
  }

  logValidators() {
    console.log(this.validatorsStore);
    fs.writeFile("output.json", JSON.stringify(this.validatorsStore), 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }
   
      console.log("JSON file has been saved.");
  }); 
  }

  setValidators(validators) {
    this.validatorsStore = validators;
  }

  getValidatorsDetails() {
    return new Promise(resolve => {
        this.httpService.get(`${nodeRpc1}/staking/validators`, { httpAgent: this.httpAgent }).pipe( map(res => res.data)).subscribe(async (data:any) => {
        // TODO remove debugging
        // console.log( data );
        if (data !== null) {
          // this.validatorsStore = (data).sort((obj1, obj2) => {
          //   return Number(obj1.tokens) < Number(obj2.tokens) ? 1 : 0;
          // })

          this.validatorsStore = data;
          resolve();
        }
      });
    });
  }

  getValidatorsRanking() {
    return new Promise(resolve => {
      this.httpService.get(`${nodeRpc1}/validatorsets/latest`, { httpAgent: this.httpAgent }).pipe( map(res => res.data)).subscribe(data => {
        // TODO remove debugging
        // console.log(data);
        if (data !== null) {
          this.mergeProperties(this.validatorsStore, 'consensus_pubkey', data['validators'], 'pub_key', 'ranking')
            .then(() => {
              // this.updateValidators();
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
      this.httpService.get(`${nodeRpc1}/slashing/validators/${validator.consensus_pubkey}/signing_info`, { httpAgent: this.httpAgent }).pipe( map(res => res.data))
        .subscribe(data => {
          // TODO remove debugging
          // console.log(data);
          validator.slashing = data;
          resolve();
        });
    });
  }

  getValidatorDistribution(validator:any) {
    return new Promise(resolve => {
      this.httpService.get(`${nodeRpc1}/distribution/validators/${validator.operator_address}`, { httpAgent: this.httpAgent }).pipe( map(res => res.data))
        .subscribe(
          (data:any) => {
            // TODO remove debugging
            // console.log(data);
            if(data) {
              validator.distribution = data;
            } else {
              validator.distribution = {
                operator_address: null
              }
              resolve(); 
            }
            this.httpService.get(`${nodeRpc1}/auth/accounts/${data.operator_address}`, { httpAgent: this.httpAgent }).pipe( map(res => res.data))
              .subscribe((data) => {
                validator.account = data;
                resolve();
              });
          },
          (error) => {
            // TODO remove debugging
            // console.log(error);
            validator.distribution = [];
            validator.account = { tokens: 0 };
            resolve();
          }
        );
    });
  }
  
  // TODO @aakatev 
  // Seems like rewards and outstanding rewards are messed up in rpc
  // Keep an eye to see if they fix it
  getValidatorRewards(validator) {
    return new Promise(resolve => {
      this.httpService.get(`${nodeRpc1}/distribution/validators/${validator.operator_address}/rewards`, { httpAgent: this.httpAgent }).pipe( map(res => res.data))
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

  getValidatorOutstandingRewards(validator) {
    return new Promise(resolve => {
      this.httpService.get(`${nodeRpc1}/distribution/validators/${validator.operator_address}/outstanding_rewards`, { httpAgent: this.httpAgent }).pipe( map(res => res.data))
        .subscribe(
          (data) => {
            // TODO remove debugging
            // console.log(data);
            validator.rewards = data;
            resolve();
          },
          (error) => {
            // TODO remove debugging
            // console.log(error);
            validator.rewards = null;
            resolve();
          }
        );
    });
  }

  getValidatorUnbondDelegations(validator) {
    validator.unbonding_total = 0;
    return new Promise(resolve => {
      this.httpService.get(`${nodeRpc1}/staking/validators/${validator.operator_address}/unbonding_delegations`, { httpAgent: this.httpAgent }).pipe( map(res => res.data))
        .subscribe(data => {
          // TODO remove debugging
          // console.log(data);
          validator.unbonding_delegations = data;
          if(data) {
            (<any[]>data).forEach(delegation => {
              (<any[]>delegation.entries).forEach(entry => {
                // TODO remove debugging
                // console.log(parseInt(entry.balance));
                validator.unbonding_total += parseInt(entry.balance, 10);
              })
            });
          }
          resolve();
        });
    });
  }


  // getValidatorDelegations(validatorIndex) {
  //   return new Promise(resolve => {
  //     this.httpService.get(`${nodeRpc1}/staking/validators/${this.validatorsStore[validatorIndex].operator_address}/delegations`, { httpAgent: this.httpAgent }).pipe( map(res => res.data))
  //       .subscribe((data: Array<any>) => {
  //         let validator = this.validatorsStore[validatorIndex];
  //         validator.delegations = data;
  //         validator.self_bond = 0;
          
  //         if(data && validator.account) {
  //           data.forEach(delegation => {
  //             switch (validator.account.type) {
  //               case "auth/Account": {
  //                 if(!validator.account.tokens && validator.account.value.coins) {
  //                   // TODO remove debugging
  //                   // console.log(validator.account.value.coins[0].amount);
  //                   validator.account.tokens = validator.account.value.coins[0].amount;
  //                 }
  //                 if(delegation.delegator_address === validator.account.value.address) {
  //                   // TODO remove debugging
  //                   // console.log('triggered auth: ', delegation.shares);
  //                   validator.self_bond += Number(delegation.shares);
  //                 } 
  //                 break;
  //               }
  //               case "auth/DelayedVestingAccount": {
  //                 if(!validator.account.tokens && validator.account.value.BaseVestingAccount.BaseAccount.coins) {
  //                   // TODO remove debugging
  //                   // console.log(validator.account.value.BaseVestingAccount.BaseAccount.coins);
  //                   validator.account.tokens = validator.account.value.BaseVestingAccount.BaseAccount.coins[0].amount;
  //                 }

  //                 if(delegation.delegator_address === validator.account.value.address) {
  //                   // TODO remove debugging
  //                   // console.log('triggered vest', delegation.shares);
  //                   validator.self_bond += Number(delegation.shares);
  //                 } 
  //                 break;
  //               }
  //               default:{
  //                 // TODO remove debugging
  //                 // console.log('Unknown account type: ', validator.account.type);
  //                 break;
  //               }
  //             }
  //           });  
  //         }
  //         resolve();
  //       });
  //   });
  // }

  
  // asyncGetDelegations() {
  //   return new Promise (async resolve => {
  //     for (const validator in this.validatorsStore) {
  //       // TODO remove debugging
  //       // console.log(this.validatorsStore[validator]);
  //       await this.getValidatorDelegations(validator);
  //     }
  //     resolve();
  //   });
  // }

  // getDelegations() {
  //   return new Promise (async resolve => {
  //     for (const validator in this.validatorsStore) {
  //       // TODO remove debugging
  //       // console.log(this.validatorsStore[validator]);
  //       this.getValidatorDelegations(validator);
  //     }
  //     resolve();
  //   });
  // }


  triggerDelegations() {
    let validatorsPromises = [];

    for (let i = 0; i < this.validatorsStore.length; i++) {
      validatorsPromises.push( this.initDelegations( this.validatorsStore[i]) ) ;
    }

    Promise.all(validatorsPromises).then(()=> {
      this.logValidators()
    });
  };

  initDelegations(validator) {
    return new Promise (resolve => {
      this.getValidatorDelegations(validator.operator_address)
      .subscribe((data: any) => {
        // console.log(data);
        validator.delegations = data;
      },
      (error) => {
        console.log(error);
        validator.delegations = [];
        resolve();
      },
      () => {  
        this.calculateSelfBond(validator);
        // TODO look again
        // Might be buggy
        resolve();
      });
    });
  }

  calculateSelfBond(validator) {
    let delegations = validator.delegations;
    validator.self_bond = 0;

    const count$ = range(0, delegations.length);

    count$.subscribe((count) => {
      if(delegations[count].delegator_address === validator.distribution.operator_address) {
        validator.self_bond += Number(delegations[count].shares);
      }
      // TODO add unbonding
    },
    (error) => {
      console.log(error);
    },
    () => {

    });
  }

  getValidatorDelegations(address) {
    return this.httpService.get(`${nodeRpc1}/staking/validators/${address}/delegations`, { httpAgent: this.httpAgent }).pipe(map(res => res.data));
  }

}