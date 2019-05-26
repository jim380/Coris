import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WsService } from 'src/app/services/ws.service';
import { Store } from '@ngrx/store';
// import { ValidatorsService } from 'src/app/services/validators.service';
import { trigger, state, query, transition, animate, style, keyframes, animation, useAnimation, animateChild, group, stagger } from '@angular/animations';
import { fadeInAnimation, fade } from '../../animations/animation';
// import { State } from 'src/app/interfaces/state.interface';
// import { PricingService } from 'src/app/services/pricing.service';
// import { BlocksService } from 'src/app/services/blocks.service';
// import { map } from 'rxjs/operators';
import { AppState, State, BlocksState } from 'src/app/state/app.interface';
import { selectAppState } from 'src/app/state/app.reducers';
import { selectBlocksState } from 'src/app/state/blocks/blocks.reducers';

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
  appState: Observable<AppState>;
  blocksState: Observable<BlocksState>;
  networks = [
    {id: 1, name: 'mainnet'},
    {id: 2, name: 'testnet'},
  ];

  constructor(
    // private ws:WsService, 
    private appStore: Store <State>
  ) { }

  ngOnInit() { 
    this.appState = this.appStore.select(selectAppState);
    this.blocksState = this.appStore.select(selectBlocksState);
  }

  ngOnDestroy() { }
}
