import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as AppActions from '../app.actions'
// import { nodeRpc, nodeWs, nodeRpcTest } from '../../config.js'
import { decodeBech32, fromWords } from '../lib/bech32';
import { hex } from '../lib/hex';
import { sha256 } from 'js-sha256'; 

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  totalStake = 0;  
  wsValidatorsStore = null;
  wsValidatorsMapping: Map<string,string> = new Map;
  // poolStake = null;

  numOfValidators = 0;
  MAX_STORE_INDEX = 10;

  constructor(
    private store: Store <{App: { 
      blocks: [], 
      txs: [], 
      validators: [], 
      round: {}, 
      roundStep: {}, 
      valsMap: Map<string,string>,
      stakePool: {} }}>, 
    private http: HttpClient) { 
      this.initValidators();
  }

  getTotalStake() { return this.totalStake };

  // Validators mapping
  setValidators(validators) {
    this.wsValidatorsStore = validators;
    this.store.dispatch(new AppActions.UpdateValidators(this.wsValidatorsStore));
  }

  // Validators mapping
  setStakingPool() {
    return new Promise(resolve => {
        this.http.get(`https://aakatev.me/node_txs/staking/pool`).subscribe(async data => {
        console.log(data);
        if(data !== null) {
          this.store.dispatch(new AppActions.UpdateStakePool(data));
        } 
        resolve();
      });
    });
  }
  
  updateValidators() {
    this.store.dispatch(new AppActions.UpdateValidators(this.wsValidatorsStore));
    this.store.dispatch(new AppActions.UpdateValsMap(this.wsValidatorsMapping));
    console.log(this.wsValidatorsStore);
    console.log(this.wsValidatorsMapping);
  }
  

  getValidatorsDetails() {
    return new Promise(resolve => {
        this.http.get(`https://aakatev.me/node_txs/staking/validators`).subscribe(async data => {
        // console.log(data);
        if(data !== null) {
          this.setValidators(data);
        } 
        resolve();
      });
    });
  }

  getValidatorsRanking() {
    return new Promise(resolve => {
      // this.http.get(`${nodeRpcTest}/validators_ranking`).subscribe(data => {
      this.http.get(`https://aakatev.me/node_txs/validatorsets/latest`).subscribe(data => {
        // Debugging
        // console.log(data);
        if(data !== null) {
          this.mergeProperties(this.wsValidatorsStore, "consensus_pubkey", data['validators'], "pub_key", "ranking")
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
      for(let targetIndex in targetArray) {
        for(let propertyIndex in propertyArray) {
          if(propertyArray[propertyIndex][propertyArrayProperty] === targetArray[targetIndex][targetArrayProperty]) {
            targetArray[targetIndex][propertyName] = propertyArray[propertyIndex];
            // Debugging
            // console.log(targetArray[targetIndex]);  
          }
        }
      }
      resolve();
    });
  }

  getValidatorSlashing(validator) {
    return new Promise(resolve => {
      this.http.get(`https://aakatev.me/node_txs/slashing/validators/${validator.consensus_pubkey}/signing_info`)
        .subscribe(data => {
          // Debugging
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
    let decodedPubkey = decodeBech32(pubKey);  
    let pubKeyHex = hex.bytesToHex(fromWords(decodedPubkey.words)).substr(10);
    return this.hashSha256(pubKeyHex).substr(0, 40);
  }

  hashSha256(pubkey) {
    let hash = sha256.create();
    let bytes = hex.hexToBytes(pubkey);
    hash.update(bytes); 
    return hash.hex().toUpperCase(); 
  }

  getValidatorHex(validator) {
    return new Promise(async resolve => {
      let hexAddr = await this.getHexAddress(validator['consensus_pubkey']);
      validator['hex_address'] = hexAddr;
      this.wsValidatorsMapping.set(hexAddr, validator['description'].moniker);
      resolve();  
    });
  }

  getValidatorDelegations(validator) {
    return new Promise(resolve => {
      this.http.get(`https://aakatev.me/node_txs/staking/validators/${this.wsValidatorsStore[validator].operator_address}/delegations`)
        .subscribe(data => {
          // Debugging
          console.log(data);
          
          this.wsValidatorsStore[validator].delegations = data;
          resolve();
        });
    });
  }

  
  async initValidators() {
    await this.getValidatorsDetails();
    await this.getValidatorsRanking();

    this.wsValidatorsStore.forEach(async validator => {
      await this.getValidatorSlashing(validator);
    });

    this.wsValidatorsStore.forEach(async validator => {
      await this.getValidatorAvatars(validator);
    });

    this.wsValidatorsStore.forEach(async validator => {
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

    this.getDelegations().then(data => {
      console.log('333');
    });
    
    // Debugging
    console.log("Validators init done!");

    this.updateValidators();
  };
  // End validators mapping
  
  asyncGetDelegations() {
    return new Promise (async resolve => {
      for (let validator in this.wsValidatorsStore) {
        // Debugging
        // console.log(this.wsValidatorsStore[validator]);
        await this.getValidatorDelegations(validator);
      }
      resolve()
    });
  }

  getDelegations() {
    return new Promise (async resolve => {
      for (let validator in this.wsValidatorsStore) {
        // Debugging
        // console.log(this.wsValidatorsStore[validator]);
        this.getValidatorDelegations(validator);
      }
      resolve();
    });
  }

  calculateTotalVotingPower() {
    return new Promise (async resolve => {
      for (let validator of this.wsValidatorsStore) {
        this.totalStake += await Number(validator['tokens']);
        this.store.dispatch(new AppActions.UpdateTotalStake(this.totalStake));
        // console.log(this.totalStake);
      }
      resolve();
    });
  }


  sortValidatorsNumber(property, direction) {
    this.wsValidatorsStore.sort((a, b) => 
      direction ? parseFloat(b[property]) - parseFloat(a[property]) : parseFloat(b[property]) + parseFloat(a[property])
    );
    this.updateValidators();
  }


  sortValidatorsString(property, direction) {
    this.wsValidatorsStore.sort((a, b) => 
      direction ? b['description'][property] > a['description'][property] : b['description'][property] < a['description'][property]
    );
    this.updateValidators();
  }

}
