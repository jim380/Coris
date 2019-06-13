import { BlocksActionTypes } from './blocks.actions';
import { BlocksState } from './blocks.interface';
import { createSelector } from '@ngrx/store';


export function blocksReducers(blocksState = initialBlocksState, action): BlocksState {
  switch(action.type) {
    
    case BlocksActionTypes.UPDATE_BLOCKS: {
      return {
        ...blocksState,
        blocks: action.payload,
      }
    }
    
    case BlocksActionTypes.UPDATE_BLOCKS_TIME: {
      return {
        ...blocksState,
        blocksTime: action.payload,
      }
    }

    case BlocksActionTypes.UPDATE_BLOCKS_TIME_AVG: {
      return {
        ...blocksState,
        blocksTimeAvg: action.payload,
      }
    }

    default: {
      return blocksState;
    }
  }
}

export const initialBlocksState: BlocksState = {
  blocks: [],
  blocksTime: [],
  blocksTimeAvg: 0,
};

export const selectBlocksState = (state) => state.blocksState;
export const selectBlocks = createSelector(selectBlocksState, (state) => state.blocks);
export const selectBlocksTime = createSelector(selectBlocksState, (state) => state.blocksTime);
export const selectBlocksTimeAvg = createSelector(selectBlocksState, (state) => state.blocksTimeAvg);