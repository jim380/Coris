import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidatorsComponent } from './validators/validators.component';
import { BlocksComponent } from './blocks/blocks.component';
import { TxsComponent } from './txs/txs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LastBlockComponent } from './last-block/last-block.component';
import { appReducer } from './app.reducers';
import { BlockComponent } from './block/block.component';
import { TxComponent } from './tx/tx.component';
import { ValidatorComponent } from './validator/validator.component';

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
