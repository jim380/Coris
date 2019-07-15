// App modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { ClipboardModule } from 'ngx-clipboard';
import { ToastrModule } from 'ngx-toastr';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
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
import { ChartCardsComponent } from './components/validators/chart-cards/chart-cards.component';
import { ChartCardsGovComponent } from './components/governance/chart-cards-gov/chart-cards-gov.component';
// End chart components

import { reducers } from './state/index';
import { DropdownDirective } from './Directives/dropdown.directive';
import { BgHighlightDirective } from './Directives/bg-highlight.directive';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { AgoPipe } from './pipes/ago.pipe';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BtnCloseComponent } from './components/popups/btn-close/btn-close.component';
import { ValidatorSpanComponent } from './components/validator-span/validator-span.component';

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

export const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};


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
    ValidatorSpanComponent
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
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    ClipboardModule,
    [
      StoreModule.forRoot(reducers)
    ],
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
    }),
    SwiperModule
  ],
  providers: [
    { 
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
