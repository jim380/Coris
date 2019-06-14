// App modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { ClipboardModule } from 'ngx-clipboard';
import { ToastrModule } from 'ngx-toastr';
import { LayoutModule } from '@angular/cdk/layout';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { AgmCoreModule } from '@agm/core';
// End app modules

// Main components
import { AppComponent } from './app.component';
import { ValidatorsComponent } from './components/validators/validators.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { TxsComponent } from './components/txs/txs.component';
import { GovernanceComponent } from './components/governance/governance.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import { CarouselComponent } from './components/status-bar/carousel/carousel.component';
// End main components

// Popup components
import { ValidatorComponent } from './components/popups/validator/validator.component';
import { GovDetailComponent } from './components/popups/gov-detail/gov-detail.component';
import { BlockComponent } from './components/popups/block/block.component';
import { TxComponent } from './components/popups/tx/tx.component';
import { TxsListCardComponent } from './components/popups/txs-list-card/txs-list-card.component';
import { AccountDetailComponent } from './components/popups/account-detail/account-detail.component';
import { DialogEntryComponent } from './components/popups/dialog-entry.component'
// End popup components

// Chart components
import { ChartCardsComponent } from './components/charts/chart-cards/chart-cards.component';
import { ChartCardsGovComponent } from './components/charts/chart-cards-gov/chart-cards-gov.component';
// End chart components

import { reducers } from './state/index';
import { DropdownDirective } from './Directives/dropdown.directive';
import { BgHighlightDirective } from './Directives/bg-highlight.directive';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { AgoPipe } from './pipes/ago.pipe';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { TimeAgoPipe } from 'time-ago-pipe';
import { BtnCloseComponent } from './components/popups/btn-close/btn-close.component';
// import { StatusCard1Component } from './components/test/status-card1/status-card1.component';
// import { StatusCard2Component } from './components/test/status-card2/status-card2.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { NewTxComponent } from './components/new-tx/new-tx.component';
// import { SearchService } from './services/search.service';
// import { TestComponent } from './components/test/test.component';

declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'pan': { direction: Hammer.DIRECTION_All },
    'swipe': { direction: Hammer.DIRECTION_VERTICAL },
  };

  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'auto',
          inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
          recognizers: [
            [Hammer.Swipe, {
              direction: Hammer.DIRECTION_HORIZONTAL
            }]
          ]
    });
    return mc;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ValidatorsComponent,
    BlocksComponent,
    TxsComponent,
    GovernanceComponent,
    BlockComponent,
    TxComponent,
    ValidatorComponent,
    StatusBarComponent,
    FooterComponent,
    DropdownDirective,
    BgHighlightDirective,
    ScrollTopComponent,
    AgoPipe,
    SidenavComponent,
    CarouselComponent,
    TimeAgoPipe,
    GovDetailComponent,
    ChartCardsComponent,
    ChartCardsGovComponent,
    TxsListCardComponent,
    AccountDetailComponent,
    BtnCloseComponent,
    DialogEntryComponent
    // DashboardComponent,
    // NewTxComponent,
    // TestComponent,
    // StatusCard1Component,
    // StatusCard2Component,
  ],
  entryComponents: [
    GovDetailComponent,
    ValidatorComponent,
    TxsListCardComponent,
    TxComponent,
    BlockComponent,
    AccountDetailComponent,
    DialogEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    ClipboardModule,
    [
      StoreModule.forRoot(reducers)
    ],
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
    }),
    AgmCoreModule.forRoot({ apiKey: 'ULKdG4NuUxzJcpQFspxF' })

  ],
  providers: [
    // SearchService,
    MDBSpinningPreloader,
    { 
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
