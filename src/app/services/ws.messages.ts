export const unsubAllMsg = {
  "jsonrpc": "2.0",
  "method": "unsubscribe_all",
  "id": "0",
  "params": {}
};

export const subBlockMsg = {
  "jsonrpc": "2.0",
  "method": "subscribe",
  "id": "0",
  "params": {
    "query": `tm.event='NewBlock'`
  }
};

export const subTxMsg = {
  "jsonrpc": "2.0",
  "method": "subscribe",
  "id": "0",
  "params": {
    "query": `tm.event='Tx'`
  }
};

export const subValMsg = {
  "jsonrpc": "2.0",
  "method": "subscribe",
  "id": "0",
  "params": {
    "query": `tm.event='ValidatorSetUpdate'`
  }
};

export const subRoundMsg = {
  "jsonrpc": "2.0",
  "method": "subscribe",
  "id": "0",
  "params": {
    "query": `tm.event='NewRound'`
  }
};

export const subRoundStepMsg = {
  "jsonrpc": "2.0",
  "method": "subscribe",
  "id": "0",
  "params": {
    "query": `tm.event='NewRoundStep'`
  }
};

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