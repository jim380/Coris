import { ActionReducerMap } from '@ngrx/store';
import { validatorsReducers } from './validators/validators.reducers';
import { blocksReducers } from './blocks/blocks.reducers';
import { consensusRedusers } from './consensus/consensus.reducers';
import { appReducers } from './app/app.reducers';
import { ValidatorsState } from './validators/validator.interface';
import { BlocksState } from './blocks/blocks.interface';
import { ConsensusState } from './consensus/consensus.interface';
import { AppState } from './app/app.interface';
import { TxsState } from './txs/txs.interface';
import { StakeState } from './stake/stake.interface';
import { txsReducers } from './txs/txs.reducers';
import { stakeReducers } from './stake/stake.reducers';

export const reducers: ActionReducerMap<State> = {
  validatorsState: validatorsReducers,
  blocksState: blocksReducers,
  txsState: txsReducers,
  stakeState: stakeReducers,
  consensusState: consensusRedusers,
  appState: appReducers
};

export interface State {
  validatorsState: ValidatorsState;
  blocksState: BlocksState;
  txsState: TxsState;
  consensusState: ConsensusState;
  stakeState: StakeState;
  appState: AppState;
};
