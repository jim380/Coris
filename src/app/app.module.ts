// App modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { ClipboardModule } from 'ngx-clipboard';
import { ToastrModule } from 'ngx-toastr';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
// End app modules

// Main components
import { AppComponent } from './app.component';
import { ValidatorsComponent } from './components/explorer/validators/validators.component';
import { BlocksComponent } from './components/explorer/blocks/blocks.component';
import { TxsComponent } from './components/explorer/txs/txs.component';
import { GovernanceComponent } from './components/explorer/governance/governance.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import { CarouselComponent } from './components/status-bar/carousel/carousel.component';
// End main components

// Popup components
import { ValidatorComponent } from './components/explorer/popups/validator/validator.component';
import { GovDetailComponent } from './components/explorer/governance/proposal/gov-detail.component';
import { BlockComponent } from './components/explorer/blocks/block/block.component';
import { TxComponent } from './components/explorer/txs/tx/tx.component';
import { TxsListCardComponent } from './components/explorer/txs/txs-list-card/txs-list-card.component';
import { AccountDetailComponent } from './components/explorer/account/account-detail.component';
import { DialogEntryComponent } from './components/explorer/popups/dialog-entry.component'
// End popup components

// Chart components
import { ChartCardsComponent } from './components/explorer/validators/chart-cards/chart-cards.component';
import { ChartCardsGovComponent } from './components/explorer/governance/chart-cards-gov/chart-cards-gov.component';
// End chart components

import { reducers } from './state/index';
import { DropdownDirective } from './Directives/dropdown.directive';
import { BgHighlightDirective } from './Directives/bg-highlight.directive';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { AgoPipe } from './pipes/ago.pipe';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BtnCloseComponent } from './components/explorer/popups/btn-close/btn-close.component';
import { ValidatorSpanComponent } from './components/explorer/validator-span/validator-span.component';
import { FaucetComponent } from './components/faucet/faucet.component';

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
    GovDetailComponent,
    ChartCardsComponent,
    ChartCardsGovComponent,
    TxsListCardComponent,
    AccountDetailComponent,
    BtnCloseComponent,
    DialogEntryComponent,
    ValidatorSpanComponent,
    FaucetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClipboardModule,
    [
      StoreModule.forRoot(reducers)
    ],
    MDBBootstrapModulesPro.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
    })

  ],
  providers: [
    MDBSpinningPreloader,
    { 
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
