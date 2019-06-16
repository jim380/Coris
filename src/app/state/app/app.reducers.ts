import { AppActionTypes } from './app.actions';
import { AppState } from './app.interface';
import { createSelector } from '@ngrx/store';


export function appReducers(appState = initialAppState, action): AppState {
  switch(action.type) {

    case AppActionTypes.UPDATE_NETWORK: {
      return {
        ...appState,
        network: action.payload,
      }
    }      

    default: {
      return appState;
    }
  }
}

export const initialAppState: AppState = {
  network: 'cosmoshub-2',
};

export const selectAppState = (state) => state.appState;
export const selectNetwork = createSelector(selectAppState, (state) => state.network);