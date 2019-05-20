import * as ValidatorsActions from './validators.actions';
import { initialState } from '../initial-state';


export function validatorsReducer(state = initialState, action: ValidatorsActions.ValidatorsActions) {
  switch(action.type) {
    
    case ValidatorsActions.UPDATE_VALIDATORS: {
      return {
        ...state,
        validators: action.payload,
      }
    }

    default: {
      return state;
    }
  }
}