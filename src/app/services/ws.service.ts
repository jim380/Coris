import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as AppActions from '../state/app.actions'
import { nodeRpc2, nodeWs } from '../../config.js'
import { 
  unsubBlockMsg, 
  subBlockMsg, 
  subTxMsg, 
  subValMsg, 
  subRoundMsg, 
  subRoundStepMsg } from './ws.messages'

@Injectable({
  providedIn: 'root'
})
export class WsService {
  newWebSocket = new WebSocket(nodeWs);

  blocksState: Observable<{blocks: []}>;
  txsState: Observable<{txs: []}>;
  roundState: Observable<{round: []}>;
  roundStepState: Observable<{roundStep: []}>;

  blocksStore = [];
  txsStore = [];

  MAX_STORE_INDEX = 10;

  constructor(
    private store: Store<{App: { 
      blocks: [], 
      txs: [], 
      validators: [], 
      round: {}, 
      roundStep: {}, 
      valsMap: Map<string,string>
    }}>, 
    private http: HttpClient ) { 

    // TODO @aakatev remove with next commits
    // Code to preload some txs and blocks
    // ***
    // this.http.get(`${nodeRpc2}/status`).subscribe(data => {
    //   // Debugging
    //   // let currValidators = data['result'].genesis.validators;
    //   let lastBlock = data['result'].sync_info.latest_block_height;

    //   this.http.get(`${nodeRpc2}/tx_search?query="tx.height>${lastBlock-100}"`).subscribe(data => {
    //     this.txsStore = data['result'].txs.reverse();
    //     this.store.dispatch(new AppActions.UpdateTxs(this.txsStore));
    //   });

    //   this.http.get(`${nodeRpc2}/blockchain?minHeight=${lastBlock-50}&maxHeight=${lastBlock}`).subscribe(data => {
    //     this.blocksStore = data['result'].block_metas.reverse();
    //     this.store.dispatch(new AppActions.UpdateBlocks(this.blocksStore));
    //   });
    // });

     // WS handlers
    this.newWebSocket.onopen = (event) => {
      this.subscribe();
    };

    this.newWebSocket.onmessage = (event) => {
      let json = JSON.parse(event.data);
      if (Object.keys(json.result).length !== 0) {
        if(json.result.data.type === 'tendermint/event/NewBlock') {
          // Debugging
          console.log('NewBlock!');
          console.log(json.result.data.value);
          
          if(Object.keys(this.blocksStore).length >= this.MAX_STORE_INDEX) {
            this.blocksStore.shift();
          }
          this.blocksStore.push(json.result.data.value.block);
          
          this.store.dispatch(new AppActions.UpdateBlocks(this.blocksStore));
        } else if(json.result.data.type === 'tendermint/event/Tx') {
          // Debugging
          console.log('NewTx!');
          
          this.http.get(`${nodeRpc2}/tx_search?query="tx.height=${json.result.data.value.TxResult.height}"`).subscribe(data => {
            if(Object.keys(this.txsStore).length >= this.MAX_STORE_INDEX) {
              this.txsStore.shift();
            }
            // Debugging
            console.log('Data', data);
            console.log('Json', json.result);
            this.txsStore.unshift(data['result'].txs[json.result.data.value.TxResult.index]);
            this.store.dispatch(new AppActions.UpdateTxs(this.txsStore));
          });
        // TODO call validator service to update
        // } else if(json.result.data.type === 'tendermint/event/ValidatorSetUpdates') {
        //   // TODO check if this logic is sufficient
        //   this.initValidators();
        } else if (json.result.data.type === 'tendermint/event/NewRound') {
          // Debugging
          // console.log(json.result.data.value);
          this.store.dispatch(new AppActions.UpdateRound(json.result.data.value));
        } else if (json.result.data.type === 'tendermint/event/RoundState') {
          // Debugging
          // console.log(json.result.data.value);
          this.store.dispatch(new AppActions.UpdateRoundStep(json.result.data.value));
        }
      }
    };
  };

  getWsBlockStore() { return this.blocksStore };
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