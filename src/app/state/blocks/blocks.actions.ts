import { Action } from '@ngrx/store';

export const UPDATE_BLOCKS = 'UPDATE_BLOCKS';

export class UpdateBlocks implements Action {
  readonly type = UPDATE_BLOCKS;
  constructor(public payload: any[]) {};
}

export type BlocksActions = UpdateBlocks;