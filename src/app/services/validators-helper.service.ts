import { Injectable } from '@angular/core';
import { range, Observable } from 'rxjs';
import { State } from '../interfaces/state.interface';
import * as ValidatorsActions from '../state/validators/validators.actions';
import { Store } from '@ngrx/store';
import { nodeRpc1 } from '../../config.js';
import { ValidatorsService } from './validators.service';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsHelperService {
  validatorsStore = []; 
  validatorsState: Observable<State>;
  constructor(
    private store: Store<State>,
    private validatorsService: ValidatorsService,
    private http: HttpClient
  ) { 
    console.log("Validators-helper Service injected");
    
    this.validatorsService.getPrecachedValidators().subscribe((data: any) => {
      if(data === 100) {
        this.store.select('Validators').pipe(first())
        .subscribe((data) => {
          this.validatorsStore = data.validators;
        },
        (error) => console.log(error),
        () => this.triggerDelegationsAndBalances()
        );    
      }
    });
  }

  triggerDelegationsAndBalances() {
    const count$ = range(0, this.validatorsStore.length);
    count$.subscribe((count) => {
      this.initDelegations(this.validatorsStore[count]);
      this.initAccountBalance(this.validatorsStore[count]);
    });
  };

  initDelegations(validator) {
    this.getValidatorDelegations(validator.operator_address)
      .subscribe((data: any) => {
        // console.log(data);
        validator.delegations = data;
      },
      (error) => {
        // console.log(error);
        validator.delegations = [];
      },
      () => {
        this.store.dispatch(new ValidatorsActions.UpdateValidators(this.validatorsStore));    
        this.calculateSelfBond(validator);
      });
  }

  initAccountBalance(validator) {
    this.getAccountBalance(validator.distribution.operator_address).subscribe((data) => {
      validator.distribution.balance = data;
    },
    (error) => {
      console.log(validator);
    },
    () => {
      this.store.dispatch(new ValidatorsActions.UpdateValidators(this.validatorsStore));
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
    },
    (error) => {
      console.log(error);
    },
    () => {
      this.store.dispatch(new ValidatorsActions.UpdateValidators(this.validatorsStore));
    });
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

}
