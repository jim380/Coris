import { Injectable, HttpService } from '@nestjs/common';
import { Observable, range } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import * as http from 'http';
export const nodeRpc1 = "http://149.28.228.142:1317"; 

@Injectable()
export class AppService {
  httpAgent = new http.Agent({ maxSockets: 15, keepAlive: true });

  constructor(private readonly httpService: HttpService) { 
  }

  getHello() {
    // this.findAll().subscribe((data:any) => {
    //   console.log(data);
    // });
    this.initValidators();
  }

  validators = []; 
  
  // NEW LOGIC
  initValidators() {
    this.getValidators().subscribe((validators: any) => {
      console.log(validators);
      this.validators = validators.sort((validator1, validator2) => {
        return Number(validator1.tokens) < Number(validator2.tokens) ? 1 : 0;
      });
      const count$ = range(0, this.validators.length);
      
      count$
        .subscribe((count) => {
          this.validators[count].rank = count + 1;
        },
        (error) => {
          console.log(error);
        },
        () => {
          count$.subscribe((count) => {
            this.getValidatorDistribution(this.validators[count].operator_address)
              .subscribe((data: any) => {
                // console.log(data);
                this.validators[count].distribution = data;
              },
              (error) => {
                console.log(error);
                this.validators[count].distribution = [];

                this.initDelegations(count);
              },
              () => {
                this.initDelegations(count);
                this.initAccountBalance(count);
              });
          });
        });

    });

    // TODO remove debugging
    // console.log('Validators init completed!');
    // TODO uncomment later
    // this.updateValidators();
  }

  initDelegations(index) {
    this.getValidatorDelegations(this.validators[index].operator_address)
      .subscribe((data: any) => {
        // console.log(data);
        this.validators[index].delegations = data;
      },
      (error) => {
        console.log(error);
        this.validators[index].delegations = [];
      },
      () => {
        this.calculateSelfBond(index);
      });
  }

  calculateSelfBond(index) {
    let delegations = this.validators[index].delegations;
    this.validators[index].self_bond = 0;

    const count$ = range(0, delegations.length);

    count$.subscribe((count) => {
      if(delegations[count].delegator_address === this.validators[index].distribution.operator_address) {
        this.validators[index].self_bond += Number(delegations[count].shares);
      }
    },
    (error) => {
      console.log(error);
    },
    () => {

    });
  }

  rankValidators(validators) {
    validators.forEach( (validator, index) => {
      // TODO remove debugging
      console.log(validator);
      // validator.tokens = Number(validator.tokens);
      validator.rank = (index+1);
    });
  }

  initAccountBalance(index) {
    this.getAccountBalance(this.validators[index].distribution.operator_address).subscribe((data) => {
      this.validators[index].distribution.balance = data;
    },
    (error) => {
      console.log(error);
    },
    () => {
      console.log(this.validators);
    });
  }

  getValidators() {
    return this.httpService.get(`${nodeRpc1}/staking/validators`, { httpAgent: this.httpAgent }).pipe( map(res => res.data) );
  }

  getValidatorDistribution(address) {
    return this.httpService.get(`${nodeRpc1}/distribution/validators/${address}`, { httpAgent: this.httpAgent }).pipe( map(res => res.data) );
  }

  getValidatorDelegations(address) {
    return this.httpService.get(`${nodeRpc1}/staking/validators/${address}/delegations`, { httpAgent: this.httpAgent }).pipe( map(res => res.data) );
  }

  getAccountBalance(address) {
    return this.httpService.get(`${nodeRpc1}/bank/balances/${address}`, { httpAgent: this.httpAgent }).pipe( map(res => res.data) );
  }

}
