import { Action } from '@ngrx/store';

export enum BlocksActionTypes {
  UPDATE_BLOCKS = 'UPDATE_BLOCKS',
  UPDATE_BLOCKS_TIME = 'UPDATE_BLOCKS_TIME',
  UPDATE_BLOCKS_TIME_AVG = 'UPDATE_BLOCKS_TIME_AVG',
}

export class UpdateBlocks implements Action {
  readonly type = BlocksActionTypes.UPDATE_BLOCKS;
  constructor(public payload: any[]) {};
}

export class UpdateBlocksTime implements Action {
  readonly type = BlocksActionTypes.UPDATE_BLOCKS_TIME;
  constructor(public payload: any[]) {};
}

export class UpdateBlocksTimeAvg implements Action {
  readonly type = BlocksActionTypes.UPDATE_BLOCKS_TIME_AVG;
  constructor(public payload: any) {};
}