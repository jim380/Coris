import { ConsensusActionTypes } from './consensus.actions';
import { ConsensusState } from './consensus.interface';
import { createSelector } from '@ngrx/store';


export function consensusRedusers(consensusState = initialConsensusState, action): ConsensusState {
  switch(action.type) {
    case ConsensusActionTypes.UPDATE_CONSENSUS_STATE: {
      return {
        height: action.payload.height,
        round: action.payload.round,
        step: action.payload.step,
        proposer: action.payload.proposer
      };
    }
    case ConsensusActionTypes.UPDATE_ROUND_STATE: {
      return {
        ...consensusState,
        height: action.payload.height,
        round: action.payload.round,
        step: action.payload.step,
      };
    }
    case ConsensusActionTypes.UPDATE_HEIGHT: {
      return {
        ...consensusState,
        height: action.payload,
      };
    }
    case ConsensusActionTypes.UPDATE_ROUND: {
      return {
        ...consensusState,
        round: action.payload,
      };
    }
    case ConsensusActionTypes.UPDATE_STEP: {
      return {
        ...consensusState,
        step: action.payload,
      };
    }
    case ConsensusActionTypes.UPDATE_PROPOSER: {
      return {
        ...consensusState,
        proposer: action.payload,
      };
    }
    default: {
      return consensusState;
    }
  }
}

export const initialConsensusState: ConsensusState = {
  height: '0',
  round: '0',
  step: 'loading',
  proposer: null,
};

export const selectConsensusState = (state) => state.consensusState;
export const selectConsensusHeight = createSelector(selectConsensusState, (state) => state.height);
export const selectConsensusRound = createSelector(selectConsensusState, (state) => state.round);
export const selectConsensusStep = createSelector(selectConsensusState, (state) => state.step);
export const selectConsensusProposer = createSelector(selectConsensusState, (state) => state.proposer);