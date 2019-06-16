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
import { selectConsensusProposer, selectConsensusHeight } from 'src/app/state/consensus/consensus.reducers';
import { State } from 'src/app/state';
import { selectValidatorsMap } from 'src/app/state/validators/validators.reducers';
import { first } from 'rxjs/operators';
import { selectNetwork } from 'src/app/state/app/app.reducers';

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
  network$: Observable<string> = this.appStore.select(selectNetwork);
  height$: Observable<string> = this.appStore.select(selectConsensusHeight);
  proposer$: Observable<string> = this.appStore.select(selectConsensusProposer);
  validatorsMap$: Observable<any> = this.appStore.select(selectValidatorsMap);

  networks = [
    {id: 1, name: 'mainnet'},
    {id: 2, name: 'testnet'},
  ];

  constructor(
    private popupService: PopupService,
    private appStore: Store <State>
  ) { }

  ngOnInit() { }

  openValidatorDialog(addressHEX$) {
    addressHEX$.pipe(first()).subscribe(addressHEX => this.popupService.openValidatorDialogAddrHEX(addressHEX));
  }

}
