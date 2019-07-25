import { Action } from '@ngrx/store';

export enum FaucetActionTypes {
  UPDATE_FAUCET_ADDRESS = 'UPDATE_FAUCET_ADDRESS',
  UPDATE_FAUCET_COINS = 'UPDATE_FAUCET_COINS',
};

export class UpdateFaucetAddress implements Action {
  readonly type = FaucetActionTypes.UPDATE_FAUCET_ADDRESS;
  constructor(public payload: any) {};
}


export class UpdateFaucetCoins implements Action {
  readonly type = FaucetActionTypes.UPDATE_FAUCET_COINS;
  constructor(public payload: any) {};
}