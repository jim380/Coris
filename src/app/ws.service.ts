import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as AppActions from './app.actions'

@Injectable({
  providedIn: 'root'
})
export class WsService {
  newWebSocket = new WebSocket("wss://aakatev.me/iris/websocket");

  blocksState: Observable<{blocks: []}>;
  txsState: Observable<{txs: []}>;

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

  constructor(private store: Store<{App: { blocks: [], txs: [], validators: []} }>, private http: HttpClient) { 
    this.http.get('https://aakatev.me/iris/status').subscribe(data => {
      // Debugging
      // let currValidators = data['result'].genesis.validators;
      let lastBlock = data['result'].sync_info.latest_block_height;

      this.http.get(`https://aakatev.me/iris/tx_search?query="tx.height>${lastBlock-100}"`).subscribe(data => {
        this.wsTxStore = data['result'].txs.reverse();
        this.store.dispatch(new AppActions.UpdateTxs(this.wsTxStore));
      });

      this.http.get(`https://aakatev.me/iris/blockchain?minHeight=${lastBlock-50}&maxHeight=${lastBlock}`).subscribe(data => {
        this.wsBlockStore = data['result'].block_metas.reverse();
        this.store.dispatch(new AppActions.UpdateBlocks(this.wsBlockStore));
      });

      this.http.get(`https://aakatev.me/iris/validators?height=${lastBlock}`).subscribe(data => {
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
          this.http.get(`https://aakatev.me/iris/tx_search?query="tx.height=${json.result.data.value.TxResult.height}"`).subscribe(data => {
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
          this.http.get('https://aakatev.me/iris/status').subscribe(data => {
            // Debugging
            // let currValidators = data['result'].genesis.validators;
            let lastBlock = data['result'].sync_info.latest_block_height;
            this.http.get(`https://aakatev.me/iris/validators?height=${lastBlock}`).subscribe(data => {
              this.wsValidatorsStore = data['result'].validators;
              this.store.dispatch(new AppActions.UpdateValidators(this.wsValidatorsStore));
            });    
          });  
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