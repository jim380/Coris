import { Action } from '@ngrx/store';

export enum ConsensusActionTypes {
  UPDATE_CONSENSUS_STATE = 'UPDATE_CONSENSUS_STATE',
  UPDATE_ROUND_STATE = 'UPDATE_ROUND_STATE',
  UPDATE_HEIGHT = 'UPDATE_HEIGHT',
  UPDATE_ROUND = 'UPDATE_ROUND',
  UPDATE_STEP = 'UPDATE_STEP',
  UPDATE_PROPOSER = 'UPDATE_PROPOSER',
};

export class UpdateConsensusState implements Action {
  readonly type = ConsensusActionTypes.UPDATE_CONSENSUS_STATE;
  constructor(public payload: any) {};
}

export class UpdateRoundState implements Action {
  readonly type = ConsensusActionTypes.UPDATE_ROUND_STATE;
  constructor(public payload: any) {};
}

export class UpdateHeight implements Action {
  readonly type = ConsensusActionTypes.UPDATE_HEIGHT;
  constructor(public payload: any[]) {};
}

export class UpdateRound implements Action {
  readonly type = ConsensusActionTypes.UPDATE_ROUND;
  constructor(public payload: any[]) {};
}

export class UpdateStep implements Action {
  readonly type = ConsensusActionTypes.UPDATE_STEP;
  constructor(public payload: any[]) {};
}

export class UpdateProposer implements Action {
  readonly type = ConsensusActionTypes.UPDATE_PROPOSER;
  constructor(public payload: any[]) {};
}