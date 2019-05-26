import { Action } from '@ngrx/store';

export enum AppActionTypes {
  UPDATE_TXS = 'UPDATE_TXS',
  UPDATE_ROUND = 'UPDATE_ROUND',
  UPDATE_ROUND_STEP = 'UPDATE_ROUND_STEP',
  UPDATE_VALS_MAP = 'UPDATE_VALS_MAP',
  UPDATE_TOTAL_STAKE = 'UPDATE_TOTAL_STAKE',
  UPDATE_STAKE_POOL = 'UPDATE_STAKE_POOL',
} 

export class UpdateTxs implements Action {
  readonly type = AppActionTypes.UPDATE_TXS;
  constructor(public payload: any[]) {};
}

export class UpdateRound implements Action {
  readonly type = AppActionTypes.UPDATE_ROUND;
  constructor(public payload: any[]) {};
}

export class UpdateRoundStep implements Action {
  readonly type = AppActionTypes.UPDATE_ROUND_STEP;
  constructor(public payload: any[]) {};
}

export class UpdateValsMap implements Action {
  readonly type = AppActionTypes.UPDATE_VALS_MAP;
  constructor(public payload: any) {};
}


export class UpdateTotalStake implements Action {
  readonly type = AppActionTypes.UPDATE_TOTAL_STAKE;
  constructor(public payload: any) {};
}

export class UpdateStakePool implements Action {
  readonly type = AppActionTypes.UPDATE_STAKE_POOL;
  constructor(public payload: any) {};
}