import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidatorsComponent } from './validators/validators.component';
import { BlocksComponent } from './blocks/blocks.component';
import { TxsComponent } from './txs/txs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LastBlockComponent } from './last-block/last-block.component';

@NgModule({
  declarations: [
    AppComponent,
    ValidatorsComponent,
    BlocksComponent,
    TxsComponent,
    DashboardComponent,
    LastBlockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
