import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { ValidatorComponent } from '../components/validator/validator.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  openValidatorDetailDialog(operatorAddress, appState, dialog) {
    console.log(operatorAddress);
    appState.pipe(
      take(1)
    ).subscribe((data) => {
      // @aakatev 05/16/19
      // Some validators are not available at state
      // TOFIX figuire out other way to query missing validators
      // Might need major changes in validator.service.ts
      let validatorQuery = data.validators
        .filter(x => x.operator_address == operatorAddress);
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
}
