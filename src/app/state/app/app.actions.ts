import { Action } from '@ngrx/store';

export enum AppActionTypes {
  UPDATE_NETWORK = 'UPDATE_NETWORK',
} 

export class UpdateNetwork implements Action {
  readonly type = AppActionTypes.UPDATE_NETWORK;
  constructor(public payload: any) {};
}
