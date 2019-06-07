import { Component } from '@angular/core';
import { WsService } from './services/ws.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ValidatorsService } from './services/validators.service';
import { trigger, state, query, transition, animate, style, keyframes, animation, useAnimation, animateChild, group, stagger } from '@angular/animations';
import { fadeInAnimation, fade } from './animations/animation';
import {ToastService} from 'ng-uikit-pro-standard';
import { PricingService } from './services/pricing.service';
import { PopupService } from './services/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('dropDownAnimation', [
      transition(':enter',[
        group([
          query('h1, h2', [
            style({ transform: 'translateY(-20px)'}),
            animate(1000)
          ]),
          query('@fadeInAnimation', 
            stagger(200, [ animateChild() ])
          )
        ])
      ])
    ]),
    trigger('fadeInAnimation',[
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '1500ms'
          }
        })
      ])
    ]),
    fade
  ]
})
export class AppComponent {

  networks = [
    {id: 1, name: 'mainnet'},
    {id: 2, name: 'testnet'},
  ];

  constructor(
    private ws:WsService, 
    private pricingService: PricingService,
    private vs:ValidatorsService,
    private popupService: PopupService
  ) {  }

  ngOnInit() { 
    this.pricingService.initStakingPool();
  }

  ngOnDestroy() {
    this.ws.unsubscribe();
  }

  getPopupService() {
    return this.popupService;
  }
}

