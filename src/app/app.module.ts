// import { UniversalSearchBarComponent } from './components/universal-search-bar/universal-search-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidatorsComponent } from './components/validators/validators.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { TxsComponent } from './components/txs/txs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LastBlockComponent } from './components/last-block/last-block.component';
import { appReducer } from './state/app.reducers';
import { BlockComponent } from './components/block/block.component';
import { TxComponent } from './components/tx/tx.component';
import { ValidatorComponent } from './components/validator/validator.component';
import { NewTxComponent } from './components/new-tx/new-tx.component';
import { MaterialModule } from './material.module';

import { DummyComponent } from './components/dummy/dummy.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainNavComponent } from './components/navigation/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DropdownDirective } from './Directives/dropdown.directive';
import { BgHighlightDirective } from './Directives/bg-highlight.directive';
import { GovernanceComponent } from './components/governance/governance.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { SearchService } from './services/search.service';
import { AgoPipe } from './pipes/ago.pipe';
// import {TimeAgoPipe} from 'time-ago-pipe';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { AgmCoreModule } from '@agm/core';
import { TestComponent } from './components/test/test.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { VerticalBarChartComponent } from './components/charts/vertical-bar-chart/vertical-bar-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { HorizontalBarChartComponent } from './components/charts/horizontal-bar-chart/horizontal-bar-chart.component';
import { VerticalTabsComponent } from './components/validator-profile/vertical-tabs/vertical-tabs.component';
import { ProfileCardComponent } from './components/validator-profile/profile-card/profile-card.component';

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
    DummyComponent,
    StatusBarComponent,
    FooterComponent,
    MainNavComponent,
    DropdownDirective,
    BgHighlightDirective,
    GovernanceComponent,
    ScrollTopComponent,
    AgoPipe,
    TestComponent,
    SidenavComponent,
    LineChartComponent,
    VerticalBarChartComponent,
    PieChartComponent,
    HorizontalBarChartComponent,
    VerticalTabsComponent,
    ProfileCardComponent
    // TimeAgoPipe
    // UniversalSearchBarComponent,
  ],
  entryComponents: [
    ProfileCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    StoreModule.forRoot({ App: appReducer }),
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'ULKdG4NuUxzJcpQFspxF' })

  ],
  providers: [SearchService, MDBSpinningPreloader],
  bootstrap: [AppComponent],
})
export class AppModule { }
