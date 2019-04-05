import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidatorsComponent } from './components/validators/validators.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { TxsComponent } from './components/txs/txs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LastBlockComponent } from './components/last-block/last-block.component';
import { appReducer } from './app.reducers';
import { BlockComponent } from './components/block/block.component';
import { TxComponent } from './components/tx/tx.component';
import { ValidatorComponent } from './components/validator/validator.component';
import { NewTxComponent } from './components/new-tx/new-tx.component';

@NgModule({
  declarations: [
    AppComponent,
    ValidatorsComponent,
    BlocksComponent,
    TxsComponent,
    DashboardComponent,
    LastBlockComponent,
    BlockComponent,
    TxComponent,
    ValidatorComponent,
    NewTxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ App: appReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
