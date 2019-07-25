import { FaucetState } from './faucet.interface';
import { FaucetActionTypes } from './faucet.actions';
import { createSelector } from '@ngrx/store';


export function faucetReducers(faucetState = initialFaucetState, action): FaucetState {
  switch(action.type) {
    case FaucetActionTypes.UPDATE_FAUCET_ADDRESS: {
      return {
        ...faucetState,
        address: action.payload,
      }
    }
    case FaucetActionTypes.UPDATE_FAUCET_COINS: {
      return {
        ...faucetState,
        coins: action.payload,
      }
    }
    default: {
      return faucetState;
    }
  }
}

export const initialFaucetState: FaucetState = {
  address: 'xrn:1thq0u7qeltna23emadkqv9cz0qmcjj5299ne06',
  coins: [ { denom: 'tree', amount: '0' } ]
};

export const selectFaucetState = (state) => state.faucetState;
export const selectFaucetAddress = createSelector(selectFaucetState, (state) => state.address);
export const selectFaucetCoins = createSelector(selectFaucetState, (state) => state.coins);