import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WsService } from 'src/app/services/ws.service';
import { Store } from '@ngrx/store';
import { ValidatorsService } from 'src/app/services/validators.service';
import { trigger, state, query, transition, animate, style, keyframes, animation, useAnimation, animateChild, group, stagger } from '@angular/animations';
import { fadeInAnimation, fade } from '../../animations/animation';
import { State } from 'src/app/interfaces/state.interface';
import { PricingService } from 'src/app/services/pricing.service';
import { BlocksService } from 'src/app/services/blocks.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
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
  appState: Observable<State>;
  atomData = null;
  avgBlockTime = 0;
  inflation = 0;

  networks = [
    {id: 1, name: 'mainnet'},
    {id: 2, name: 'testnet'},
  ];

  constructor(
    private ws:WsService, 
    private store: Store <State>,
    private vs:ValidatorsService,
    private ps:PricingService,
    private bs:BlocksService) { }

  ngOnInit() { 
    this.appState = this.store.select('App');
    this.ps.getAtomPrice().subscribe(data => {
      // TODO remove debugging
      // console.log(data.data['3794']);
      this.atomData = data.data['3794'];
    });
    
    this.ps.getInflation().subscribe(data => {
      // TODO remove debugging
      // console.log(data);
      this.inflation = data;
    });
    
    this.bs.getBlockTime$()
      .subscribe(data => {
        this.avgBlockTime = data/1000;
      })
  }
  ngOnDestroy() {
    this.ws.unsubscribe();
  }
}
