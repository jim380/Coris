// import {Action} from '@ngrx/store';
import * as AppActions from './app.actions';

const initialState = {
  blocks:[],
  txs: [],
  validators: [],
  round: {},
  roundStep: {}
};

export function appReducer(state = initialState, action: AppActions.AppActions) {
  switch(action.type) {
    case AppActions.UPDATE_BLOCKS:
      return {
        // ...state,
        // blocks:[...state.blocks, action.payload]
        blocks: action.payload,
        txs: state.txs,
        validators: state.validators,
        round: state.round,
        roundStep: state.roundStep,
      }
      break;
    
    case AppActions.UPDATE_TXS:
      return {
        blocks: state.blocks,
        txs: action.payload,
        validators: state.validators,
        round: state.round,
        roundStep: state.roundStep,
      }
      break;

    case AppActions.UPDATE_VALIDATORS:
      return {
        txs: state.txs,
        blocks: state.blocks,
        validators: action.payload,
        round: state.round,
        roundStep: state.roundStep,
      }
      break;
    
    case AppActions.UPDATE_ROUND:
      return {
        txs: state.txs,
        blocks: state.blocks,
        validators: state.validators,
        round: action.payload,
        roundStep: state.roundStep,
      }
      break;

    case AppActions.UPDATE_ROUND_STEP:
      return {
        txs: state.txs,
        blocks: state.blocks,
        validators: state.validators,
        round: state.round,
        roundStep: action.payload,
      }
      break;


    default:
  }
  return state;
}