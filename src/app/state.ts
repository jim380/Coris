// import { Tx } from './txs/tx'
// import { Block } from './blocks/block'
export class State {
  chainId: string;
  lastBlock: number;
  numValidators: number;
  numTxs: number;
  lastTxs: any[];
  lastBlocks: any[];
}