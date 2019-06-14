import { Component } from '@angular/core';
import { WsService } from './services/ws.service';
import { ValidatorsService } from './services/validators.service';
import { trigger, state, query, transition, animate, style, keyframes, animation, useAnimation, animateChild, group, stagger } from '@angular/animations';
import { fadeInAnimation, fade } from './animations/animation';
import { PricingService } from './services/pricing.service';
import { Store } from '@ngrx/store';
import { selectConsensusState } from './state/consensus/consensus.reducers';
import { State } from './state';

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
    private vs:ValidatorsService,
  ) {  }

  ngOnInit() { }

  ngOnDestroy() {
    this.ws.unsubscribe();
  }
}

