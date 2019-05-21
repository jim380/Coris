import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducers';
import { validatorsReducer } from './validators/validators.reducers';
import { blocksReducer } from './blocks/blocks.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature('App', appReducer),
    StoreModule.forFeature('Validators', validatorsReducer),
    StoreModule.forFeature('Blocks', blocksReducer)
  ]
})
export class AppStateModule {}