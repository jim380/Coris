import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as AppActions from './app.actions'
import { nodeRpc, nodeWs, nodeRpcTest } from '../config.js'
import { decodeBech32, fromWords } from './lib/bech32';
import { hex } from './lib/hex';
import { sha256 } from 'js-sha256'; 

@Injectable({
  providedIn: 'root'
})
export class WsService {
  newWebSocket = new WebSocket(nodeWs);

  blocksState: Observable<{blocks: []}>;
  txsState: Observable<{txs: []}>;
  roundState: Observable<{round: []}>;
  roundStepState: Observable<{roundStep: []}>;

  wsBlockStore = [];
  wsTxStore = [];
  wsValidatorsStore = null;

  numOfValidators;
  MAX_STORE_INDEX = 10;

  // Unsubscribe
  unsubBlockMsg = {
    "jsonrpc": "2.0",
    "method": "unsubscribe_all",
    "id": "0",
    "params": {}
  };

  subBlockMsg = {
    "jsonrpc": "2.0",
    "method": "subscribe",
    "id": "0",
    "params": {
      "query": `tm.event='NewBlock'`
    }
  };

  subTxMsg = {
    "jsonrpc": "2.0",
    "method": "subscribe",
    "id": "0",
    "params": {
      "query": `tm.event='Tx'`
    }
  };

  subValMsg = {
    "jsonrpc": "2.0",
    "method": "subscribe",
    "id": "0",
    "params": {
      "query": `tm.event='ValidatorSetUpdate'`
    }
  };

  subRoundMsg = {
    "jsonrpc": "2.0",
    "method": "subscribe",
    "id": "0",
    "params": {
      "query": `tm.event='NewRound'`
    }
  };

  subRoundStepMsg = {
    "jsonrpc": "2.0",
    "method": "subscribe",
    "id": "0",
    "params": {
      "query": `tm.event='NewRoundStep'`
    }
  };
  
  constructor(private store: Store<{App: { blocks: [], txs: [], validators: [], round: {}, roundStep: {}} }>, private http: HttpClient) { 

    this.http.get(`${nodeRpc}/status`).subscribe(data => {
      // Debugging
      // let currValidators = data['result'].genesis.validators;
      let lastBlock = data['result'].sync_info.latest_block_height;

      this.http.get(`${nodeRpc}/tx_search?query="tx.height>${lastBlock-100}"`).subscribe(data => {
        this.wsTxStore = data['result'].txs.reverse();
        this.store.dispatch(new AppActions.UpdateTxs(this.wsTxStore));
      });

      this.http.get(`${nodeRpc}/blockchain?minHeight=${lastBlock-50}&maxHeight=${lastBlock}`).subscribe(data => {
        this.wsBlockStore = data['result'].block_metas.reverse();
        this.store.dispatch(new AppActions.UpdateBlocks(this.wsBlockStore));
      });
    });

     // WS handlers
    this.newWebSocket.onopen = (event) => {
      this.subscribe();
    };

    this.newWebSocket.onmessage = (event) => {
      let json = JSON.parse(event.data);
      if (Object.keys(json.result).length !== 0) {
        if(json.result.data.type === 'tendermint/event/NewBlock') {
          // Debugging
          // console.log('NewBlock!');
          if(Object.keys(this.wsBlockStore).length >= this.MAX_STORE_INDEX) {
            this.wsBlockStore.shift();
          }
          this.wsBlockStore.push(json.result.data.value.block);
          // Debugging
          // console.log(json.result.data.value);
          // Update Store
          this.store.dispatch(new AppActions.UpdateBlocks(this.wsBlockStore));
        } else if(json.result.data.type === 'tendermint/event/Tx') {
          // Debugging
          // console.log('NewTx!');
          this.http.get(`${nodeRpc}/tx_search?query="tx.height=${json.result.data.value.TxResult.height}"`).subscribe(data => {
            if(Object.keys(this.wsTxStore).length >= this.MAX_STORE_INDEX) {
              this.wsTxStore.shift();
            }
            // Debugging
            // console.log('Data', data);
            // console.log('Json', json.result);
            this.wsTxStore.unshift(data['result'].txs[json.result.data.value.TxResult.index]);
            // Update store
            this.store.dispatch(new AppActions.UpdateTxs(this.wsTxStore));
          });

        } else if(json.result.data.type === 'tendermint/event/ValidatorSetUpdates') {
          // TODO check if this logic is sufficient
          this.initValidators();
        } else if (json.result.data.type === 'tendermint/event/NewRound') {
          // Debugging
          // console.log(json.result.data.value);
          // Update Store
          this.store.dispatch(new AppActions.UpdateRound(json.result.data.value));
        } else if (json.result.data.type === 'tendermint/event/RoundState') {
          // Debugging
          // console.log(json.result.data.value);
          // Update Store
          this.store.dispatch(new AppActions.UpdateRoundStep(json.result.data.value));
        }
      }
    };
    this.initValidators();
  };

  // Validators mapping
  setValidators(validators) {
    this.wsValidatorsStore = validators;
    this.store.dispatch(new AppActions.UpdateValidators(this.wsValidatorsStore));
  }
  
  updateValidators() {
    this.store.dispatch(new AppActions.UpdateValidators(this.wsValidatorsStore));
    console.log(this.wsValidatorsStore);
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
    // this.http.get(`${nodeRpcTest}/validators_ranking`).subscribe(data => {
      this.http.get(`https://aakatev.me/node_txs/validatorsets/latest`).subscribe(data => {
      // Debugging
      // console.log(data);
      if(data !== null) {
        this.mergeProperties(this.wsValidatorsStore, "consensus_pubkey", data['validators'], "pub_key", "ranking")
          .then(() => {
            this.updateValidators()
          });
      }
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
      let regex = await validator.description.moniker.replace(/\s/g, '').match(/[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]*/i)[0];
      this.http.get(`https://keybase.io/_/api/1.0/user/lookup.json?usernames=${regex}&fields=pictures`)
        .subscribe(async data => {
          // Debugging
          // console.log(`https://keybase.io/_/api/1.0/user/lookup.json?usernames=${validator.data.description.moniker.replace(/\s/g, '')}&fields=pictures`);
          // console.log(data['them']);
          // Debugging regex to parse moniker
          // console.log(validator.data.description.moniker.replace(/\s/g, '').match(/[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]*/i)[0]);
          if (data['status'].code === 0) {
            validator.keybase = data['them']; 
            if(data['them'][0] !== null && data['them'][0].pictures !== undefined) { 
              validator.picture = data['them'][0].pictures.primary.url; 
            }
          } else {
            validator.keybase = [null];
          }
          resolve();
        });
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
      validator['hex_address'] = await this.getHexAddress(validator['consensus_pubkey']);
      resolve();  
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

    await this.updateValidators();
  };
  // End validators mapping

  
  sortValidators(property) {
    this.wsValidatorsStore.sort((a, b) => parseFloat(b[property]) - parseFloat(a[property]));
    this.updateValidators();
  }


  getWsBlockStore() { return this.wsBlockStore };
  getWsTxStore() { return this.wsTxStore };

  subscribe() {
    this.newWebSocket.send(JSON.stringify(this.subBlockMsg));
    this.newWebSocket.send(JSON.stringify(this.subTxMsg));
    this.newWebSocket.send(JSON.stringify(this.subValMsg));
    this.newWebSocket.send(JSON.stringify(this.subRoundMsg));
    this.newWebSocket.send(JSON.stringify(this.subRoundStepMsg));
  };

  unsubscribe() {
    this.newWebSocket.send(JSON.stringify(this.unsubBlockMsg));
  };
}
// @aakatev
// 
// Possible ws sub queries
// 
// subQuery = [
//   'Tx', 
//   'NewBlock', 
//   'NewBlockHeader', 
//   'Vote', 
//   'NewRound', 
//   'NewRoundStep', 
//   'Polka', 
//   'Relock', 
//   'TimeoutPropose', 
//   'TimeoutWait', 
//   'Unlock', 
//   'ValidBlock', 
//   'ValidatorSetUpdates', 
//   'Lock', 
//   'CompleteProposal',
// // ];
// getwsBlockStore = () => {
//   return wsBlockStore;
// }
// end