import { ValidatorsActionTypes } from './validators.actions';
import { ValidatorsState } from './validator.interface';
import { createSelector } from '@ngrx/store';


export function validatorsReducers(validatorsState = initialValidatorsState, action): ValidatorsState {
  switch(action.type) {
    case ValidatorsActionTypes.UPDATE_VALIDATORS: {
      return {
        ...validatorsState,
        validators: action.payload,
      };
    }
    case ValidatorsActionTypes.UPDATE_VALIDATORS_MAP: {
      return {
        ...validatorsState, 
        validatorsMap: action.payload,
      }
    }
    default: {
      return validatorsState;
    }
  }
}

export const initialValidatorsState: ValidatorsState = {
  validators:[],
  validatorsMap: new Map(),
};

export const selectValidatorsState = (state) => state.validatorsState;
export const selectValidators = createSelector(selectValidatorsState, (state) => state.validators);
export const selectValidatorsMap = createSelector(selectValidatorsState, (state) => state.validatorsMap);