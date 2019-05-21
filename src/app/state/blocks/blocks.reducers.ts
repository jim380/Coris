import * as BlocksActions from './blocks.actions';
import { initialState } from '../initial-state';


export function blocksReducer(state = initialState, action: BlocksActions.BlocksActions) {
  switch(action.type) {
    
    case BlocksActions.UPDATE_BLOCKS: {
      return {
        ...state,
        blocks: action.payload,
      }
    }

    default: {
      return state;
    }
  }
}