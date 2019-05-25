import { Injectable, HttpService, Inject } from '@nestjs/common';
import { map } from 'rxjs/operators';
import * as http from 'http';
import * as fs from 'fs';
import { range, BehaviorSubject } from 'rxjs';
import { nodeRpc1 } from '../config/config';
import { Validator } from './interfaces/validator.interface';
import { CreateValidatorDto } from './dto/create-validator.dto';
import { Model } from 'mongoose';

@Injectable()
export class ValidatorsService {
  httpAgent = new http.Agent({ maxSockets: 10, keepAlive: true });
  validatorsStore = [];
  validatorsStore$ = new BehaviorSubject([]);

  public getValidatorsStore$() { return this.validatorsStore$ }

  constructor(
    private httpService: HttpService,
    @Inject('VALIDATOR_MODEL') private readonly validatorModel: Model<Validator>,
  ) {
    console.log("VALIDATORS SERVICE STARTED!");
    
    this.getValidatorsStore$().subscribe((newValidators: any[]) => {
      if(newValidators.length > 0) {
        for(let validator of newValidators) {
          this.findAndReplaceValidator(validator);
        }
      }
    });
  }


  async create(createValidatorDto: CreateValidatorDto): Promise<Validator> {
    const validator = new this.validatorModel(createValidatorDto);
    return await validator.save();
  }

  async findAll(): Promise<Validator[]> {
    return await this.validatorModel.find().exec();
  }

  async findOne(operatorAddress): Promise<Validator[]> {
    return await this.validatorModel.find({
        operator_address: operatorAddress
      }).exec();
  }

  async findAndReplaceValidator(updatedValidator) {
    return await this.validatorModel.findOneAndUpdate(
      { operator_address: updatedValidator.operator_address },
      updatedValidator,
      { useFindAndModify: false }
    ).then(async (data) => {
      if (!data) { 
        console.log("Error updating:", updatedValidator, data);
        await this.create(updatedValidator); 
      }
    });
  }

  private debugRequestsInterceptors() {
    // @aakatev Call in constructor to debug axious requests
    this.httpService.axiosRef.interceptors.request.use(request => {
      console.log('Starting Request', request.url)
      return request
    });
    this.httpService.axiosRef.interceptors.response.use(response => {
      console.log('Response:', response.headers)
      return response
    })
  }

  private logValidators() {
    fs.writeFile(`logs/out-${(new Date()).getTime()}.json`, JSON.stringify(this.validatorsStore), 'utf8', function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    }); 
  }


  async initValidators() { 
    console.log("UPDATING VALIDATORS STATE!");

    await this.getValidatorsDetails();

    for(let validator of this.validatorsStore) {
      this.getValidatorSignInfo(validator);
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

  updateDatabase() {

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
          this.validatorsStore = data;
          resolve();
        }
      });
    });
  }

  getValidatorSignInfo(validator) {
    return new Promise(resolve => {
      this.httpService.get(`${nodeRpc1}/slashing/validators/${validator.consensus_pubkey}/signing_info`, { httpAgent: this.httpAgent }).pipe( map(res => res.data))
        .subscribe(data => {
          // TODO remove debugging
          // console.log(data);
          validator.signing_info = data;
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

  triggerDelegations() {
    let validatorsPromises = [];

    for (let i = 0; i < this.validatorsStore.length; i++) {
      validatorsPromises.push( this.initDelegations( this.validatorsStore[i]) ) ;
    }

    Promise.all(validatorsPromises).then(()=> {
      this.logValidators();
      this.validatorsStore$.next(
        this.validatorsStore
      );
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
    },
    (error) => {
      console.log(error);
    },
    () => { });
  }

  getValidatorDelegations(address) {
    return this.httpService.get(`${nodeRpc1}/staking/validators/${address}/delegations`, { httpAgent: this.httpAgent }).pipe(map(res => res.data));
  }
}