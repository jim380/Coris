import { ValidatorsActionTypes } from './validators.actions';
import { initialValidatorsState, ValidatorsState } from '../app.interface';
import { createSelector } from '@ngrx/store';


export function validatorsReducers(validatorsState = initialValidatorsState, action): ValidatorsState {
  switch(action.type) {
    case ValidatorsActionTypes.UPDATE_VALIDATORS: {
      return {
        ...validatorsState,
        validators: action.payload,
      };
    }
    default: {
      return validatorsState;
    }
  }
}

export const selectValidatorsState = (state) => state.validatorsState;
export const selectValidators = createSelector(selectValidatorsState, (state) => state.validators);