import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { 
  trigger, 
  query, 
  transition, 
  animate, style, 
  useAnimation, 
  animateChild, 
  group, 
  stagger 
} from '@angular/animations';
import { fadeInAnimation, fade } from '../../animations/animation';
import { PopupService } from 'src/app/services/popup.service';
import { selectConsensusState } from 'src/app/state/consensus/consensus.reducers';
import { ConsensusState } from 'src/app/state/consensus/consensus.interface';
import { State } from 'src/app/state';
import { ValidatorsState } from 'src/app/state/validators/validator.interface';
import { selectValidatorsState } from 'src/app/state/validators/validators.reducers';
import { AppState } from 'src/app/state/app/app.interface';
import { selectAppState } from 'src/app/state/app/app.reducers';

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
  appState$: Observable<AppState>;
  validatorsState$: Observable<ValidatorsState>;
  consensusState$: Observable<ConsensusState>;
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
    this.validatorsState$ = this.appStore.select(selectValidatorsState);
    this.consensusState$ = this.appStore.select(selectConsensusState);
    this.appState$ = this.appStore.select(selectAppState);
    this.consensusState$.subscribe(state => this.proposer = state.proposer);
  }

  openValidatorDialog(addressHEX) {
    this.popupService.openValidatorDialogAddrHEX(addressHEX);
  }

}
