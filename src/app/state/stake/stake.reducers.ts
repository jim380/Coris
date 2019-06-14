import { StakeActionTypes } from './stake.actions';
import { StakeState } from './stake.interface';
import { createSelector } from '@ngrx/store';


export function stakeReducers(stakeState = initialStakeState, action): StakeState {
  switch(action.type) {  

    case StakeActionTypes.UPDATE_STAKE_POOL: {
      return {
        ...stakeState,
        stakePool: action.payload,
      }
    }
    
    case StakeActionTypes.UPDATE_ATOM_PRICE: {
      return {
        ...stakeState,
        atomPrice: action.payload,
      }
    }
    
    case StakeActionTypes.UPDATE_INFLATION: {
      return {
        ...stakeState,
        inflation: action.payload,
      }
    }

    default: {
      return stakeState;
    }
  }
}

export const initialStakeState: StakeState = {
  stakePool: {
    denom: 'stake',
    bonded: '0',
    notBonded: '0',
​    communityPool: '0'
  },
  atomPrice: 0,
  inflation: '0',
};

export const selectStakeState = (state) => state.stakeState;
export const selectStakePool = createSelector(selectStakeState, (state) => state.stakePool);
export const selectAtomPrice = createSelector(selectStakeState, (state) => state.atomPrice);
export const selectInflation = createSelector(selectStakeState, (state) => state.inflation);