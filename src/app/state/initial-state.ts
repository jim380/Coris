import { State } from '../interfaces/state.interface';

const initialState: State = {
  blocks:[],
  txs: [],
  validators: [],
  round: {},
  roundStep: {},
  valsMap: Map,
  totalStake: 0,
  stakePool: {}
};

export { initialState };