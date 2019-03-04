import {Action} from '@ngrx/store';

export const UPDATE_BLOCKS = 'UPDATE_BLOCKS';
export const UPDATE_TXS = 'UPDATE_TXS';
export const UPDATE_VALIDATORS = 'UPDATE_VALIDATORS';
export const UPDATE_ROUND = 'UPDATE_ROUND'
export const UPDATE_ROUND_STEP = 'UPDATE_ROUND_STEP'

export class UpdateBlocks implements Action {
  readonly type = UPDATE_BLOCKS;
  constructor(public payload: any[]) {};
}


export class UpdateValidators implements Action {
  readonly type = UPDATE_VALIDATORS;
  constructor(public payload: any[]) {};
}


export class UpdateTxs implements Action {
  readonly type = UPDATE_TXS;
  constructor(public payload: any[]) {};
}

export class UpdateRound implements Action {
  readonly type = UPDATE_ROUND;
  constructor(public payload: any[]) {};
}

export class UpdateRoundStep implements Action {
  readonly type = UPDATE_ROUND_STEP;
  constructor(public payload: any[]) {};
}

export type AppActions = UpdateBlocks | UpdateTxs | UpdateValidators | UpdateRound | UpdateRoundStep;