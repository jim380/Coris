import { AppActionTypes } from './app.actions';
import { initialAppState } from './app.interface';
import { AppState } from './app.interface';


export function appReducers(appState = initialAppState, action):AppState {
  switch(action.type) {
    case AppActionTypes.UPDATE_TXS: {
      return {
        ...appState,
        txs: action.payload,
      }
    }
    case AppActionTypes.UPDATE_ROUND: {
      return {
        ...appState,
        round: action.payload,
      }
    }

    case AppActionTypes.UPDATE_ROUND_STEP: {
      return {
        ...appState,
        roundStep: action.payload,
      }
    }

    case AppActionTypes.UPDATE_VALS_MAP: {
      return {
        ...appState, 
        valsMap: action.payload,
      }
    }
      
    case AppActionTypes.UPDATE_TOTAL_STAKE: {
      return {
        ...appState,
        totalStake: action.payload,
      }
    }      

    case AppActionTypes.UPDATE_STAKE_POOL: {
      return {
        ...appState,
        stakePool: action.payload,
      }
    }
    
    default: {
      return appState;
    }
  }
}

export const selectAppState = (state) => state.appState;