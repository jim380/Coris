import * as AppActions from './app.actions';
import { State } from '../interfaces/state.interface';


const initialState: State = {
  blocks:[],
  txs: [],
  validators: [],
  round: {},
  roundStep: {},
  valsMap: Map,
  totalStake: 0,
  stakePool: {}
};

export function appReducer(state = initialState, action: AppActions.AppActions) {
  switch(action.type) {
    case AppActions.UPDATE_BLOCKS:
      return {
        ...state,
        blocks: action.payload,
      }
      break;
    
    case AppActions.UPDATE_TXS:
      return {
        ...state,
        txs: action.payload,
      }
      break;

    case AppActions.UPDATE_VALIDATORS:
      return {
        ...state,
        validators: action.payload,
      }
      break;
    
    case AppActions.UPDATE_ROUND:
      return {
        ...state,
        round: action.payload,
      }
      break;

    case AppActions.UPDATE_ROUND_STEP:
      return {
        ...state,
        roundStep: action.payload,
      }
      break;

    case AppActions.UPDATE_VALS_MAP:
      return {
        ...state, 
        valsMap: action.payload,
      }
      break;
      
    case AppActions.UPDATE_TOTAL_STAKE:
      return {
        ...state,
        totalStake: action.payload,
      }
      break;
      

    case AppActions.UPDATE_STAKE_POOL:
      return {
        ...state,
        stakePool: action.payload,
      }
      break;
    
    default:
      break;
  }
  return state;
}