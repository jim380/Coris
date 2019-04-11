import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

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
import { MaterialModule } from './material.module';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { MatTooltipModule, MatDialog, MatDialogModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { DummyComponent } from './components/dummy/dummy.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainNavComponent } from './components/navigation/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

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
    ProgressSpinnerComponent,
    DummyComponent,
    StatusBarComponent,
    FooterComponent,
    MainNavComponent
  ],
  entryComponents: [
    DummyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatDialogModule,
    StoreModule.forRoot({ App: appReducer }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
