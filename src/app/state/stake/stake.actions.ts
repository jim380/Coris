import { Action } from '@ngrx/store';

export enum StakeActionTypes {
  UPDATE_TOTAL_STAKE = 'UPDATE_TOTAL_STAKE',
  UPDATE_STAKE_POOL = 'UPDATE_STAKE_POOL',
  UPDATE_ATOM_PRICE = 'UPDATE_ATOM_PRICE',
  UPDATE_INFLATION = 'UPDATE_INFLATION', 
} 

export class UpdateTotalStake implements Action {
  readonly type = StakeActionTypes.UPDATE_TOTAL_STAKE;
  constructor(public payload: any) {};
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
