import * as AppActions from './app.actions';
import { initialState } from './initial-state';


export function appReducer(state = initialState, action: AppActions.AppActions) {
  switch(action.type) {
    case AppActions.UPDATE_BLOCKS: {
      return {
        ...state,
        blocks: action.payload,
      }
    }
    
    case AppActions.UPDATE_TXS: {
      return {
        ...state,
        txs: action.payload,
      }
    }

    case AppActions.UPDATE_VALIDATORS: {
      return {
        ...state,
        validators: action.payload,
      }
    }
    
    case AppActions.UPDATE_ROUND: {
      return {
        ...state,
        round: action.payload,
      }
    }

    case AppActions.UPDATE_ROUND_STEP: {
      return {
        ...state,
        roundStep: action.payload,
      }
    }

    case AppActions.UPDATE_VALS_MAP: {
      return {
        ...state, 
        valsMap: action.payload,
      }
    }
      
    case AppActions.UPDATE_TOTAL_STAKE: {
      return {
        ...state,
        totalStake: action.payload,
      }
    }      

    case AppActions.UPDATE_STAKE_POOL: {
      return {
        ...state,
        stakePool: action.payload,
      }
    }
    
    default: {
      return state;
    }
  }
}