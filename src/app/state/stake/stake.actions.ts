import { Action } from '@ngrx/store';

export enum StakeActionTypes {
  UPDATE_STAKE_POOL = 'UPDATE_STAKE_POOL',
  UPDATE_ATOM_PRICE = 'UPDATE_ATOM_PRICE',
  UPDATE_INFLATION = 'UPDATE_INFLATION', 
} 

export class UpdateStakePool implements Action {
  readonly type = StakeActionTypes.UPDATE_STAKE_POOL;
  constructor(public payload: any) {};
}

export class UpdateAtomPrice implements Action {
  readonly type = StakeActionTypes.UPDATE_ATOM_PRICE;
  constructor(public payload: any) {};
}

export class UpdateInflation implements Action {
  readonly type = StakeActionTypes.UPDATE_INFLATION;
  constructor(public payload: any) {};
}
