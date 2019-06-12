import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { trigger, state, query, transition, animate, style, keyframes, animation, useAnimation, animateChild, group, stagger } from '@angular/animations';
import { fadeInAnimation, fade } from '../../animations/animation';
import { AppState, State, ConsensusState } from 'src/app/state/app.interface';
import { selectAppState } from 'src/app/state/app.reducers';
import { PopupService } from 'src/app/services/popup.service';
import { selectConsensusState } from 'src/app/state/consensus/consensus.reducers';

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
  consensusState: Observable<ConsensusState>;
  proposer: string;

  networks = [
    {id: 1, name: 'mainnet'},
    {id: 2, name: 'testnet'},
  ];

  constructor(
    private popupService: PopupService,
    private appStore: Store <State>
  ) { }

  ngOnInit() { 
    this.appState = this.appStore.select(selectAppState);
    this.consensusState = this.appStore.select(selectConsensusState);
    this.consensusState.subscribe(state => this.proposer = state.proposer);
  }
  ngAfterInit() { }

  ngOnDestroy() { }

  openValidatorDialog(addressHEX) {
    this.popupService.openValidatorDialogAddrHEX(addressHEX);
  }

}
