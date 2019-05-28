import { BlocksActionTypes } from './blocks.actions';
import { initialBlocksState, BlocksState } from '../app.interface';
import { createSelector } from '@ngrx/store';


export function blocksReducers(blocksState = initialBlocksState, action): BlocksState {
  switch(action.type) {
    
    case BlocksActionTypes.UPDATE_BLOCKS: {
      return {
        ...blocksState,
        blocks: action.payload,
      }
    }

    default: {
      return blocksState;
    }
  }
}
export const selectBlocksState = (state) => state.blocksState;
export const selectBlocks = createSelector(selectBlocksState, (state) => state.blocks);