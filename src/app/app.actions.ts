import {Action} from '@ngrx/store';

export const UPDATE_BLOCKS = 'UPDATE_BLOCKS';
export const UPDATE_TXS = 'UPDATE_TXS';
export const UPDATE_VALIDATORS = 'UPDATE_VALIDATORS';

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

export type AppActions = UpdateBlocks | UpdateTxs | UpdateValidators;