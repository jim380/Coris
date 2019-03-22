import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css']
})

export class ValidatorComponent implements OnInit {
  displayKeys=false;

  selectedValidator = -1;
  private subscription;

  appState: Observable<{blocks: [], txs:[], validators: []}>;
  constructor(private store: Store<{App: { blocks: [], txs: [], validators:[] } }>, private route: ActivatedRoute) { }


  findValidator (validators): void {
    for (let validator_index in validators) {
      if (validators[validator_index].keys.Addres === this.route.snapshot.paramMap.get('address')) {
        this.selectedValidator = Number(validator_index);
        console.log(this.selectedValidator);
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
