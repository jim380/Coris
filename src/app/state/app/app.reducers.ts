import { AppActionTypes } from './app.actions';
import { AppState } from './app.interface';


export function appReducers(appState = initialAppState, action): AppState {
  switch(action.type) {

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

export const initialAppState: AppState = {
  totalStake: 0,
  stakePool: {},
};

export const selectAppState = (state) => state.appState;