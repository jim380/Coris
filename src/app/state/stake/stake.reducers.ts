import { StakeActionTypes } from './stake.actions';
import { StakeState } from './stake.interface';


export function stakeReducers(stakeState = initialStakeState, action): StakeState {
  switch(action.type) {
    case StakeActionTypes.UPDATE_TOTAL_STAKE: {
      return {
        ...stakeState,
        totalStake: action.payload,
      }
    }      

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
    
    default: {
      return stakeState;
    }
  }
}

export const initialStakeState: StakeState = {
  totalStake: 0,
  stakePool: {},
  atomPrice: 0,
};

export const selectStakeState = (state) => state.stakeState;