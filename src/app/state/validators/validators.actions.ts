import { Action } from '@ngrx/store';

export enum ValidatorsActionTypes {
  UPDATE_VALIDATORS = 'UPDATE_VALIDATORS',
  UPDATE_VALIDATORS_MAP = 'UPDATE_VALIDATORS_MAP'
};

export class UpdateValidators implements Action {
  readonly type = ValidatorsActionTypes.UPDATE_VALIDATORS;
  constructor(public payload: any[]) {};
}

export class UpdateValidatorsMap implements Action {
  readonly type = ValidatorsActionTypes.UPDATE_VALIDATORS_MAP;
  constructor(public payload: any) {};
}
