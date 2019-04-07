import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WsService } from 'src/app/services/ws.service';
import { Store } from '@ngrx/store';
import { ValidatorsService } from 'src/app/services/validators.service';
import { trigger, state, query, transition, animate, style, keyframes, animation, useAnimation, animateChild, group, stagger } from '@angular/animations';
import { fadeInAnimation, fade } from '../../animations/animation';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css'],
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
export class StatusBarComponent implements OnInit {
  appState: Observable<{blocks:[], txs:[], validators:[], round:{}, roundStep: {}, valsMap: Map<string,string>}>;

  networks = [
    {id: 1, name: 'mainnet'},
    {id: 2, name: 'testnet'},
  ];

  constructor(
    private ws:WsService, 
    private store: Store <{App: {
      blocks:[], 
      txs:[], 
      validators:[], 
      round:{}, 
      roundStep: {},
      valsMap: Map<string,string>
    }}>,
    private vs:ValidatorsService
  ) {  }

  ngOnInit() { 
    this.appState = this.store.select('App');
  }

  ngOnDestroy() {
    this.ws.unsubscribe();
  }
}
