import {Action} from '@ngrx/store';
import * as AppActions from './app.actions';

const initialState = {
  blocks:[],
  txs: [],
};

export function appReducer(state = initialState, action: AppActions.AppActions) {
  switch(action.type) {
    case AppActions.UPDATE_BLOCKS:
      return {
        // ...state,
        // blocks:[...state.blocks, action.payload]
        blocks: action.payload,
        txs: state.txs,
      }
      break;
    
    case AppActions.UPDATE_TXS:
      return {
        txs: action.payload,
        blocks: state.blocks,
      }
      break;
    
    default:
  }
  return state;
}