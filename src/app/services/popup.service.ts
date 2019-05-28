import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { ValidatorComponent } from '../components/validator/validator.component';
import { Store } from '@ngrx/store';
import { State, AppState } from '../state/app.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  appState: Observable<State>;
  constructor(
    private appStore: Store<State>
  ) {
    this.appState = this.appStore.select(state => state);
    console.log("new popup service created!");
  }

  openValidatorDialog(validator, dialog) {
    console.log(validator);
    dialog.open( ValidatorComponent,  {
      data: { 
        validator
      },
      height: '75vh',
    });
  }

  openValidatorDialogAddr(operatorAddress, dialog) {
    // console.log(operatorAddress);
    this.appState.pipe(
      take(1)
    ).subscribe((state) => {
      let validatorQuery = state.validatorsState.validators
        .filter(val => val.operator_address === operatorAddress);
      if( validatorQuery.length === 1) {
        dialog.open( ValidatorComponent,  {
          data: { 
            validator: validatorQuery[0]          },
          height: '75vh',
        });
      } else {
        console.log("Validator was not found! Operator address: ", operatorAddress)
      }
    });
  }

  openValidatorDialogAddrHEX(addressHEX, dialog) {
    console.log(addressHEX);
    this.appState.pipe(
      take(1)
    ).subscribe((state) => {
      let validatorQuery = state.validatorsState.validators
        .filter(val => val.description.moniker === state.appState.valsMap.get(addressHEX));
      if( validatorQuery.length === 1) {
        dialog.open( ValidatorComponent,  {
          data: { 
            validator: validatorQuery[0]          },
          height: '75vh',
        });
      } else {
        console.log("Validator was not found! HEX address: ", addressHEX)
      }
    });
  }
}
