import { Validator } from './validators/validator.interface';

export const initialValidatorsState: ValidatorsState = {
  validators:[],
};

export const initialAppState: AppState = {
  txs: [],
  round: {
    proposer: null,
  },
  roundStep: {},
  valsMap: new Map(),
  totalStake: 0,
  stakePool: {}
};

export const initialBlocksState: BlocksState = {
  blocks: [],
};

export interface State {
  validatorsState: ValidatorsState;
  blocksState: BlocksState;
  appState: AppState;
};

export interface AppState {
  txs: any[] | null;
  round: { 
    proposer: any,
  } | null;
  roundStep: {} | null;
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