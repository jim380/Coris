import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WsService {
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
  newWebSocket = new WebSocket("wss://aakatev.me/iris/websocket");
  // query from ws and store data in js object
  wsBlockStore = [];
  wsTxStore = [];
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

  constructor() { 
     // WS handlers
    this.newWebSocket.onopen = (event) => {
      this.subscribe();
    };

    this.newWebSocket.onmessage = (event) => {
      let json = JSON.parse(event.data);
      if (Object.keys(json.result).length !== 0) {
        if(json.result.data.type === 'tendermint/event/NewBlock') {
          if(Object.keys(this.wsBlockStore).length >= this.MAX_STORE_INDEX) {
            this.wsBlockStore.shift();
          }
          this.wsBlockStore.push(json.result);
        } else if(json.result.data.type === 'tendermint/event/Tx') {
          if(Object.keys(this.wsTxStore).length >= this.MAX_STORE_INDEX) {
            this.wsTxStore.shift();
          }
          this.wsTxStore.push(json.result);

          console.log(this.getWsTxStore());
        }

        // console.log(this.getNumOfValidators());
      }
      // console.log(this.lastBlock);
    };
  };

  ngOnInit() { };
  getWsBlockStore() { return this.wsBlockStore };
  getWsTxStore() { return this.wsTxStore };
  // getNumOfValidators() { return this.wsBlockStore.pop() };

  subscribe() {
    this.newWebSocket.send(JSON.stringify(this.subBlockMsg));
    this.newWebSocket.send(JSON.stringify(this.subTxMsg));
  };

  unsubscribe() {
    this.newWebSocket.send(JSON.stringify(this.unsubBlockMsg));
  };
}
