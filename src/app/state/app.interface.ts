import { Validator } from './validators/validator.interface';
export const initialValidatorsState: ValidatorsState = {
  validators:[],
};

export const initialBlocksState: BlocksState = {
  blocks: [],
};

export const initialConsensusState: ConsensusState = {
  height: '0',
  round: '0',
  step: 'loading',
  proposer: null,
};

export const initialTxsState: TxsState = {
  txs: [],
};

export const initialAppState: AppState = {
  valsMap: new Map(),
  totalStake: 0,
  stakePool: {},
};

export interface State {
  validatorsState: ValidatorsState;
  blocksState: BlocksState;
  consensusState: ConsensusState;
  appState: AppState;
};

export interface AppState {
  valsMap: any;
  totalStake: Number | null;
  stakePool: {} | null;
};

export interface ValidatorsState {
  validators: Validator[] | null;
};

export interface BlocksState {
  blocks: any[] | null;
};

export interface ConsensusState {
  height: string;
  round: string;
  step: string;
  proposer: string;
}

export interface TxsState {
  txs: any[] | null;
};