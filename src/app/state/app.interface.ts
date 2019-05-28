import { Validator } from './validators/validator.interface';

export const initialValidatorsState: ValidatorsState = {
  validators:[],
};

export const initialAppState: AppState = {
  txs: [],
  round: {
    proposer: null,
  },
  roundStep: {
    height: null,
    round: null,
    step: null
  },
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
  roundStep: {
    height: string | null,
    round: string | null,
    step: string | null
  } | null;
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