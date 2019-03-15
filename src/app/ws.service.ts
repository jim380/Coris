import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as AppActions from './app.actions'
import { nodeRpc, nodeWs, nodeRpcTest } from '../config.js'


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
  wsValidatorsStore = [];

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
    // @aakatev Testing custom rpc
    // Test validators detailed info
    this.http.get(`${nodeRpcTest}/get_info`).subscribe(data => {
      console.log(data);
    });
    
    // Test validators mapping
    this.http.get(`${nodeRpcTest}/get_validators`,  { responseType:'text' }).subscribe(data => {
      
      let validators = data.split(';');
      validators.forEach(validator => {
        validator.split('\n').forEach(info => {
          // console.log(info);
          // Address
          console.log(info.match(/([A-z]|[0-9]){40}$/g));
          // Hex
          console.log(info.match(/([A-z]|[0-9]){64}$/g));  
          // Bech 32
          // Account
          console.log(info.match(/([A-z]|[0-9]){76}$/g));  
          // Operator
          console.log(info.match(/([A-z]|[0-9]){83}$/g));  
          // Consensus
          // console.log(info.match(/ ([A-z]|[0-9]){64}$/g));  
          
        });
        
      });
    });
    // End testing custom rpc


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

      this.http.get(`${nodeRpc}/validators?height=${lastBlock}`).subscribe(data => {
        this.wsValidatorsStore = data['result'].validators;
        this.store.dispatch(new AppActions.UpdateValidators(this.wsValidatorsStore));
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
          this.http.get(`${nodeRpc}/status`).subscribe(data => {
            // Debugging
            // let currValidators = data['result'].genesis.validators;
            let lastBlock = data['result'].sync_info.latest_block_height;
            this.http.get(`${nodeRpc}/validators?height=${lastBlock}`).subscribe(data => {
              this.wsValidatorsStore = data['result'].validators;
              // Debugging
              // console.log(data['result'].validators);
              this.store.dispatch(new AppActions.UpdateValidators(this.wsValidatorsStore));
            });    
          });  
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
  };

  ngOnInit() { };

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
// More info:
// Subscribtion queries
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