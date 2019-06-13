import { TxsActionTypes } from './txs.actions';
import { TxsState } from './txs.interface';
import { createSelector } from '@ngrx/store';


export function txsReducers(txsState = initialTxsState, action): TxsState {
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

export const initialTxsState: TxsState = {
  txs: [],
};

export const selectTxsState = (state) => state.txsState;
export const selectTxs = createSelector(selectTxsState, (state) => state.txs);