import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css']
})

export class ValidatorComponent implements OnInit {
  displayKeys=false;

  selectedValidator = -1;
  delegationInfo = [];

  private subscription;

  appState: Observable<{blocks: [], txs:[], validators: []}>;

  constructor(
    private store: Store<{App: { blocks: [], txs: [], validators:[] } }>, 
    private route: ActivatedRoute,
    private http: HttpClient) { }


  getDelegations(cosmosValoperAddr) {
    this.http.get(`https://aakatev.me/node_txs/staking/validators/${cosmosValoperAddr}/delegations`).subscribe(data => {
      this.delegationInfo = <[]>data;
      for(let i = 0; i < this.delegationInfo.length; i++) {
        this.getTxs(this.delegationInfo[i].delegator_address,i);
      }
    });
  }

  getTxs(cosmosDelegAddr, delegIndex) {
    this.http.get(`https://aakatev.me/node_txs/staking/delegators/${cosmosDelegAddr}/txs`).subscribe(data => {
      this.delegationInfo[delegIndex]['txs'] = data;
    });
  }

  findValidator (validators): void {
    for (let validator_index in validators) {
      if(validators[validator_index].keys !== undefined 
        && validators[validator_index].keys.Addres === this.route.snapshot.paramMap.get('address')) {
        this.selectedValidator = Number(validator_index);
        // Debugging @aakatev
        this.getDelegations(validators[this.selectedValidator].operator_address);
        // console.log(this.delegationService.getDelegationInfo());
        // console.log(this.selectedValidator);
      }
    }
    // TODO figuire how to unsubscribe
    // this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.appState = this.store.select('App');
    this.subscription = this.appState.subscribe(currentState => {
      if(currentState.validators.length !== 0 && this.selectedValidator === -1) {
        console.log(currentState.validators);
        this.findValidator(currentState.validators)
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.selectedValidator = -1;
  }

  showHideElem() {
    this.displayKeys = !this.displayKeys;
  }
}
