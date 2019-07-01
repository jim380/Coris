import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidatorsRoutingModule } from './validators-routing.module';
import { ValidatorsTableComponent } from './components/validators-table/validators-table.component';
import { ChartCardsComponent } from './components/chart-cards/chart-cards.component';
import { AppCommonModule } from '../app-common/app-common.module';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

@NgModule({
  declarations: [
    ValidatorsTableComponent,
    ChartCardsComponent
  ],
  imports: [
    CommonModule,
    ValidatorsRoutingModule,
    AppCommonModule,
    MDBBootstrapModulesPro
  ]
})
export class ValidatorsModule { }
