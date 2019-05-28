import { Action } from '@ngrx/store';

export enum BlocksActionTypes {
  UPDATE_BLOCKS = 'UPDATE_BLOCKS'
}

export class UpdateBlocks implements Action {
  readonly type = BlocksActionTypes.UPDATE_BLOCKS;
  constructor(public payload: any[]) {};
}