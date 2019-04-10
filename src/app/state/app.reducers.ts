import * as AppActions from './app.actions';
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

export function appReducer(state = initialState, action: AppActions.AppActions) {
  switch(action.type) {
    case AppActions.UPDATE_BLOCKS:
      return {
        blocks: action.payload,
        txs: state.txs,
        validators: state.validators,
        round: state.round,
        roundStep: state.roundStep,
        valsMap: state.valsMap,
        totalStake: state.totalStake,
        stakePool: state.stakePool,
      }
      break;
    
    case AppActions.UPDATE_TXS:
      return {
        blocks: state.blocks,
        txs: action.payload,
        validators: state.validators,
        round: state.round,
        roundStep: state.roundStep,
        valsMap: state.valsMap,
        totalStake: state.totalStake,
        stakePool: state.stakePool,
      }
      break;

    case AppActions.UPDATE_VALIDATORS:
      return {
        txs: state.txs,
        blocks: state.blocks,
        validators: action.payload,
        round: state.round,
        roundStep: state.roundStep,
        valsMap: state.valsMap,
        totalStake: state.totalStake,
        stakePool: state.stakePool,
      }
      break;
    
    case AppActions.UPDATE_ROUND:
      return {
        txs: state.txs,
        blocks: state.blocks,
        validators: state.validators,
        round: action.payload,
        roundStep: state.roundStep,
        valsMap: state.valsMap,
        totalStake: state.totalStake,
        stakePool: state.stakePool,
      }
      break;

    case AppActions.UPDATE_ROUND_STEP:
      return {
        txs: state.txs,
        blocks: state.blocks,
        validators: state.validators,
        round: state.round,
        roundStep: action.payload,
        valsMap: state.valsMap,
        totalStake: state.totalStake,
        stakePool: state.stakePool,
      }
      break;

    case AppActions.UPDATE_VALS_MAP:
      return {
        txs: state.txs,
        blocks: state.blocks,
        validators: state.validators,
        round: state.round,
        roundStep: state.roundStep, 
        valsMap: action.payload,
        totalStake: state.totalStake,
        stakePool: state.stakePool,
      }
      break;
      

    case AppActions.UPDATE_TOTAL_STAKE:
      return {
        txs: state.txs,
        blocks: state.blocks,
        validators: state.validators,
        round: state.round,
        roundStep: state.roundStep, 
        valsMap: state.valsMap,
        totalStake: action.payload,
        stakePool: state.stakePool,
      }
      break;
      

    case AppActions.UPDATE_STAKE_POOL:
      return {
        txs: state.txs,
        blocks: state.blocks,
        validators: state.validators,
        round: state.round,
        roundStep: state.roundStep, 
        valsMap: state.valsMap,
        totalStake: state.totalStake,
        stakePool: action.payload,
      }
      break;
    
    default:
      break;
  }
  return state;
}