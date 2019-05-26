import { Action } from '@ngrx/store';

export enum ValidatorsActionTypes {
  UPDATE_VALIDATORS = 'UPDATE_VALIDATORS'
};

export class UpdateValidators implements Action {
  readonly type = ValidatorsActionTypes.UPDATE_VALIDATORS;
  constructor(public payload: any[]) {};
}