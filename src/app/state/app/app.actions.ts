import { Action } from '@ngrx/store';

export enum AppActionTypes {
  UPDATE_NETWORK = 'UPDATE_NETWORK',
  TOGGLE_THEME = 'TOGGLE_THEME'
} 

export class UpdateNetwork implements Action {
  readonly type = AppActionTypes.UPDATE_NETWORK;
  constructor(public payload: any) {};
}

export class ToggleTheme implements Action {
  readonly type = AppActionTypes.TOGGLE_THEME;
  constructor() {};
}