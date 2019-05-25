import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, range, of, from, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as AppActions from '../state/app.actions';
import * as ValidatorsActions from '../state/validators/validators.actions';
import { nodeRpc1 } from '../../config.js';
import { decodeBech32, fromWords } from '../lib/bech32';
import { hex } from '../lib/hex';
import { sha256 } from 'js-sha256';
import { State } from '../interfaces/state.interface';
import { map, mergeMap, catchError, concatAll } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  validatorsStore = []; 
  validatorsMap: Map<string, string> = new Map;

  constructor(
    private store: Store <State>,
    private http: HttpClient,
    private apiService: ApiService
  ) {
    console.log("Validators Seervice injected!");
    // this.initValidators();
    this.apiService.fetchValidators$()
      .subscribe((data: any) => {
        console.log(data);
      })
    
  }

  // NEW LOGIC
  initValidators() {
    this.getValidators().subscribe((validators: any) => {
      // console.log(validators);
      this.sortValidators(validators);
      const count$ = range(0, validators.length);
      
      count$
        .subscribe((count) => {
          validators[count].rank = count + 1;
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.validatorsStore = validators;
          this.store.dispatch(new ValidatorsActions.UpdateValidators(this.validatorsStore));
          this.initValidatorsDetails();
        });
    });
  }

  precachedValidators = new BehaviorSubject(0); 
  
  getPrecachedValidators() {
    return this.precachedValidators;
  }

  initValidatorsDetails() {
    let index = 0;
    this.validatorsStore.forEach((validator:any) => {
      this.getValidatorDistribution(validator.operator_address).subscribe((data: any) => {
        validator.distribution = data;
        this.precachedValidators.next(++index);
      },
      (error) => {
        // console.log(error);
        validator.distribution = [];
        this.store.dispatch(new ValidatorsActions.UpdateValidators(this.validatorsStore));
        this.precachedValidators.next(++index);
        // this.initDelegations(validator);
      },
      () => {
        this.validatorsMap.set(
          validator.distribution.operator_address, 
          validator.description.moniker
        );
        this.validatorsMap.set(
          validator.operator_address, 
          validator.description.moniker
        );

        this.store.dispatch(new ValidatorsActions.UpdateValidators(this.validatorsStore));
        this.store.dispatch(new AppActions.UpdateValsMap(this.validatorsMap));
        // console.log(index);
        // this.initDelegations(validator);
        // this.initAccountBalance(validator);
      });
      this.initHexAddress(validator);
    });
  }

  // triggerDelegations() {
  //   const count$ = range(0, this.validatorsStore.length);
  //   count$.subscribe((count) => {
  //     this.initDelegations(this.validatorsStore[count]);
  //     this.initAccountBalance(this.validatorsStore[count]);
  //   });
  // };

  // initDelegations(validator) {
  //   this.getValidatorDelegations(validator.operator_address)
  //     .subscribe((data: any) => {
  //       // console.log(data);
  //       validator.delegations = data;
  //     },
  //     (error) => {
  //       // console.log(error);
  //       validator.delegations = [];
  //     },
  //     () => {
  //       this.store.dispatch(new ValidatorsActions.UpdateValidators(this.validatorsStore));    
  //       this.calculateSelfBond(validator);
  //     });
  // }

  // initAccountBalance(validator) {
  //   this.getAccountBalance(validator.distribution.operator_address).subscribe((data) => {
  //     validator.distribution.balance = data;
  //   },
  //   (error) => {
  //     console.log(validator);
  //   },
  //   () => {
  //     this.store.dispatch(new ValidatorsActions.UpdateValidators(this.validatorsStore));
  //   });
  // }


  sortValidators(validators) {
    validators.sort((validator1, validator2) => {
      return Number(validator1.tokens) < Number(validator2.tokens) ? 1 : 0;
    });
  }

  initHexAddress(validator) {
    const hexAddr = this.getHexAddress(validator.consensus_pubkey);
    validator.hex_address = hexAddr;
    this.validatorsMap.set(hexAddr, validator.description.moniker);
    this.store.dispatch(new AppActions.UpdateValsMap(this.validatorsMap));
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

  // getValidatorDelegations(address) {
  //   return this.http.get(`${nodeRpc1}/staking/validators/${address}/delegations`);
  // }

  // getAccountBalance(address) {
  //   return this.http.get(`${nodeRpc1}/bank/balances/${address}`);
  // }
  
  // END NEW LOGIC

  
  // SLOW NEW LOGIC
  // initValidators() {
  //   this.getValidators().subscribe((validators: any) => {
  //     // console.log(validators);
  //     this.validators = validators.sort((validator1, validator2) => {
  //       return Number(validator1.tokens) < Number(validator2.tokens) ? 1 : 0;
  //     });
      
  //     this.validatorsCount$.next(this.validators.length);
  //     this.validators$.next(this.validators);

  //     // const validators$ = from(this.validators);
  //     const count$ = range(0, this.validators.length);

  //     count$.subscribe((count) => {
  //       // console.log(validator);
  //       forkJoin(
  //         this.getValidatorDistribution(this.validators[count].operator_address),
  //         this.getValidatorDelegations(this.validators[count].operator_address)
  //       ).subscribe((data: any) => {
  //           console.log(data);
  //           this.validators[count].distribution = data[0];
  //           this.validators[count].delegations = data[1];
  //         },
  //         (error) => {
  //           console.log(error);
  //         },
  //         () => {
  //           // this.validators.push(validator);
  //           this.validators$.next(this.validators);
  //         });
  //     });
  //   });

  //   // TODO remove debugging
  //   // console.log('Validators init completed!');
  //   // TODO uncomment later
  //   // this.updateValidators();
  // }

  // END SLOW NEW LOGIC


  // async initValidators() { 
  //   this.appState = this.store.select('App');
  //   let block$ = this.appState.subscribe(data => {
  //     if( block$ && data.validators.length > 0 && data.blocks.length > 0) {
  //       // console.log(data.blocks[0].header.height);
  //       this.validatorsStore.blockStamp = Number(data.blocks[0].header.height);
  //       block$.unsubscribe();
  //     }
  //   });

  //   await this.getValidatorsDetails();
  //   await this.getValidatorsRanking();

  //   this.validatorsStore.forEach(async validator => {
  //     await this.getValidatorSlashing(validator);
      
  //     // 05/10/19 TODO  @aakatev
  //     // refactor this logic later
  //     // TODO remove debugging
  //     // console.log(validator);
  //     this.validatorsMap.set(validator.operator_address, validator.description.moniker);
  //   });

  //   this.validatorsStore.forEach(async validator => {
  //     await this.getValidatorAvatars(validator);
  //   });

  //   this.validatorsStore.forEach(async validator => {
  //     await this.getValidatorHex(validator);
  //   });

  //   this.validatorsStore.forEach(async validator => {
  //     await this.getValidatorDistribution(validator);
  //   });

  //   this.validatorsStore.forEach(async validator => {
  //     await this.getValidatorOutstandingRewards(validator);
  //   });

  //   this.validatorsStore.forEach(async validator => {
  //     await this.getValidatorRewards(validator);
  //   });

  //   this.validatorsStore.forEach(async validator => {
  //     await this.getValidatorUnbondDelegations(validator);
  //   });
        
  //   await this.calculateTotalVotingPower();

  //   // TODO @aakatev decide on version
  //   // Async version
  //   // await this.asyncGetDelegations().then(done => {
  //   //   console.log('All delegators loaded');
  //   // });
  //   // Nonasync version
  //   await this.setStakingPool();

  //   this.getDelegations();

  //   // TODO remove debugging
  //   console.log('Validators init completed!');
  //   this.validatorsStore.serviceLoaded = 1;

  //   this.updateValidators();
  // }

  // getTotalStake() { return this.totalStake; }

  // setValidators(validators) {
  //   this.validatorsStore = validators;
  //   // this.store.dispatch(new AppActions.UpdateValidators(this.validatorsStore));
  // }


  // updateValidators() {
  //   // this.store.dispatch(new AppActions.UpdateValidators(this.validatorsStore));
  //   this.store.dispatch(new AppActions.UpdateValsMap(this.validatorsMap));
    
    // TODO remove debugging
    // @aakatev 05/09/19 
    // MAIN PLACE TO COLLECT LOGS 
    // OF CURRENT VLAIDATORS STATE
    // console.log(this.validatorsStore);
    // console.log(this.validatorsMap);
  // }

  // getValidatorDistribution(validator:any) {
  //   return new Promise(resolve => {
  //     this.http.get(`${nodeRpc1}/distribution/validators/${validator.operator_address}`)
  //       .subscribe(
  //         (data:any) => {
  //           // TODO remove debugging
  //           // console.log(data);
  //           validator.distribution = data;

  //           this.http.get(`${nodeRpc1}/auth/accounts/${data.operator_address}`)
  //             .subscribe(data => {
  //               validator.account = data;
  //               // Added on 05/09/19
  //               // @aakatev
  //               if(validator.account.value.address) {
  //                 this.validatorsMap.set(validator.account.value.address, validator.description.moniker);
  //               }
  //               resolve();
  //             })
      
  //         },
  //         (error) => {
  //           // TODO remove debugging
  //           // console.log(error);
  //           validator.distribution = null;
  //           validator.account = { tokens: 0 };
  //           resolve();
  //         }
  //       );
  //   });
  // }
  
  // calculateTotalVotingPower(validators) {
  //   return new Promise (async resolve => {
  //     let totalStake = 0;
  //     for (let validator of validators) {
  //       totalStake += await Number(validator.tokens);
  //       this.store.dispatch(new AppActions.UpdateTotalStake(totalStake));
  //       // TODO remove debugging
  //       console.log(totalStake);
  //     }
  //     resolve();
  //   });
  // }

  // getValidatorRewards(validator) {
  //   return new Promise(resolve => {
  //     this.http.get(`${nodeRpc1}/distribution/validators/${validator.operator_address}/rewards`)
  //       .subscribe(
  //         (data) => {
  //           // TODO remove debugging
  //           // console.log(data);
  //           validator.rewards = data;
  //           resolve();
  //         },
  //         (error) => {
  //           // TODO remove debugging
  //           // console.log(error);
  //           validator.rewards = null;
  //           resolve();
  //         }
  //       );
  //   });
  // }

  // getValidatorOutstandingRewards(validator) {
  //   return new Promise(resolve => {
  //     this.http.get(`${nodeRpc1}/distribution/validators/${validator.operator_address}/outstanding_rewards`)
  //       .subscribe(
  //         (data) => {
  //           // TODO remove debugging
  //           // console.log(data);
  //           validator.outstanding_rewards = data;
  //           resolve();
  //         },
  //         (error) => {
  //           // TODO remove debugging
  //           // console.log(error);
  //           validator.outstandning_rewards = null;
  //           resolve();
  //         }
  //       );
  //   });
  // }

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



  // getValidatorHex(validator) {
  //   return new Promise(async resolve => {
  //     const hexAddr = await this.getHexAddress(validator['consensus_pubkey']);
  //     validator['hex_address'] = hexAddr;
  //     this.validatorsMap.set(hexAddr, validator['description'].moniker);
  //     resolve();
  //   });
  // }


  // getValidatorUnbondDelegations(validator) {
  //   validator.unbonding_total = 0;
  //   return new Promise(resolve => {
  //     this.http.get(`${nodeRpc1}/staking/validators/${validator.operator_address}/unbonding_delegations`)
  //       .subscribe(data => {
  //         // TODO remove debugging
  //         // console.log(data);
  //         validator.unbonding_delegations = data;
  //         if(data) {
  //           (<any[]>data).forEach(delegation => {
  //             (<any[]>delegation.entries).forEach(entry => {
  //               // TODO remove debugging
  //               // console.log(parseInt(entry.balance));
  //               validator.unbonding_total += parseInt(entry.balance, 10);
  //             })
  //           });
  //         }
  //         resolve();
  //       });
  //   });
  // }

  // calculateTotalVotingPower() {
  //   return new Promise (async resolve => {
  //     for (const validator of this.validatorsStore) {
  //       this.totalStake += await Number(validator['tokens']);
  //       this.store.dispatch(new AppActions.UpdateTotalStake(this.totalStake));
  //       // TODO remove debugging
  //       // console.log(this.totalStake);
  //     }
  //     resolve();
  //   });
  // }
}
