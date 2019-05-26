import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { UpdateTxs, UpdateRound, UpdateRoundStep } from '../state/app.actions';
import { UpdateBlocks } from '../state/blocks/blocks.actions';
import { nodeRpc2, nodeWs } from '../../config.js';
import { 
  unsubBlockMsg, 
  subBlockMsg, 
  subTxMsg, 
  subValMsg, 
  subRoundMsg, 
  subRoundStepMsg } from './ws.messages';
import { State } from '../state/app.interface';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  newWebSocket = new WebSocket(nodeWs);

  blocksStorage = [];
  txsStore = [];

  MAX_STORE_INDEX = 1;

  constructor(
    private appStore: Store<State>,
    private http: HttpClient 
  ) { 

     // WS handlers
    this.newWebSocket.onopen = (event) => {
      this.subscribe();
    };

    this.newWebSocket.onmessage = (event) => {
      let json = JSON.parse(event.data);
      if (json.result &&  Object.keys(json.result).length !== 0) {
        if(json.result.data.type === 'tendermint/event/NewBlock') {
          // Debugging
          // console.log('NewBlock!');
          // console.log(json.result.data.value);
          
          if(Object.keys(this.blocksStorage).length >= this.MAX_STORE_INDEX) {
            this.blocksStorage.shift();
          }
          this.blocksStorage.push(json.result.data.value.block);
          this.appStore.dispatch(new UpdateBlocks(this.blocksStorage));
        } else if(json.result.data.type === 'tendermint/event/Tx') {
          // Debugging
          // console.log('NewTx!');
          
          this.http.get(`${nodeRpc2}/tx_search?query="tx.height=${json.result.data.value.TxResult.height}"`).subscribe(data => {
            if(Object.keys(this.txsStore).length >= this.MAX_STORE_INDEX) {
              this.txsStore.shift();
            }
            // TODO remove debugging
            // console.log('Data', data);
            // console.log('Json', json.result);
            this.txsStore.unshift(data['result'].txs[json.result.data.value.TxResult.index]);
            this.appStore.dispatch(new UpdateTxs(this.txsStore));
          });
        // TODO call validator service to update
        // } else if(json.result.data.type === 'tendermint/event/ValidatorSetUpdates') {
        //   // TODO check if this logic is sufficient
        //   this.initValidators();
        } else if (json.result.data.type === 'tendermint/event/NewRound') {
          // TODO remove debugging
          // console.log(json.result.data.value);
          this.appStore.dispatch(new UpdateRound(json.result.data.value));
        } else if (json.result.data.type === 'tendermint/event/RoundState') {
          // TODO remove debugging
          // console.log(json.result.data.value);
          this.appStore.dispatch(new UpdateRoundStep(json.result.data.value));
        }
      }
    };
  };

  getWsBlockStore() { return this.blocksStorage };
  getWsTxStore() { return this.txsStore };

  subscribe() {
    this.newWebSocket.send(JSON.stringify(subBlockMsg));
    this.newWebSocket.send(JSON.stringify(subTxMsg));
    this.newWebSocket.send(JSON.stringify(subValMsg));
    this.newWebSocket.send(JSON.stringify(subRoundMsg));
    this.newWebSocket.send(JSON.stringify(subRoundStepMsg));
  };

  unsubscribe() {
    this.newWebSocket.send(JSON.stringify(unsubBlockMsg));
  };
}