import { Action } from '@ngrx/store';

export enum AppActionTypes {
  UPDATE_TOTAL_STAKE = 'UPDATE_TOTAL_STAKE',
  UPDATE_STAKE_POOL = 'UPDATE_STAKE_POOL',
} 

export class UpdateTotalStake implements Action {
  readonly type = AppActionTypes.UPDATE_TOTAL_STAKE;
  constructor(public payload: any) {};
}

export class UpdateStakePool implements Action {
  readonly type = AppActionTypes.UPDATE_STAKE_POOL;
  constructor(public payload: any) {};
}