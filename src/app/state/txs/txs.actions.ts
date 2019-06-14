import { Action } from '@ngrx/store';

export enum TxsActionTypes {
  UPDATE_TXS = 'UPDATE_BLOCKS'
}

export class UpdateTxs implements Action {
  readonly type = TxsActionTypes.UPDATE_TXS;
  constructor(public payload: any[]) {};
}