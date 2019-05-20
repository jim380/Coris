import { Action } from '@ngrx/store';

export const UPDATE_VALIDATORS = 'UPDATE_VALIDATORS';

export class UpdateValidators implements Action {
  readonly type = UPDATE_VALIDATORS;
  constructor(public payload: any[]) {};
}

export type ValidatorsActions = UpdateValidators;