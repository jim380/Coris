import { State } from './app.interface';
import { ActionReducerMap } from '@ngrx/store';
import { validatorsReducers } from './validators/validators.reducers';
import { blocksReducers } from './blocks/blocks.reducers';
import { appReducers } from './app.reducers';

export const reducers: ActionReducerMap<State> = {
  validatorsState: validatorsReducers,
  blocksState: blocksReducers,
  appState: appReducers
};
