// import {Action} from '@ngrx/store';
import * as AppActions from './app.actions';

const initialState = {
  blocks:[],
  txs: [],
  validators: [],
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
      }
      break;
    
    case AppActions.UPDATE_TXS:
      return {
        txs: action.payload,
        blocks: state.blocks,
        validators: state.validators,
      }
      break;

    case AppActions.UPDATE_VALIDATORS:
      return {
        txs: state.txs,
        blocks: state.blocks,
        validators: action.payload,
      }
      break;
    
    default:
  }
  return state;
}