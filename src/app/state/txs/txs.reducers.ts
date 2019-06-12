import { TxsActionTypes } from './txs.actions';
import { initialTxsState, TxsState } from '../app.interface';
import { createSelector } from '@ngrx/store';


export function blocksReducers(txsState = initialTxsState, action): TxsState {
  switch(action.type) {
    
    case TxsActionTypes.UPDATE_TXS: {
      return {
        ...txsState,
        txs: action.payload,
      }
    }

    default: {
      return txsState;
    }
  }
}
export const selectTxsState = (state) => state.txsState;
export const selectTxs = createSelector(selectTxsState, (state) => state.txs);