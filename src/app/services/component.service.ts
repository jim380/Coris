import { Injectable } from '@angular/core';
import { GovDetailComponent } from '../components/popups/gov-detail/gov-detail.component';
import { ValidatorComponent } from '../components/popups/validator/validator.component';
import { TxsListCardComponent } from '../components/popups/txs-list-card/txs-list-card.component';
import { BlockComponent } from '../components/popups/block/block.component';
import { TxComponent } from '../components/popups/tx/tx.component';
import { AccountDetailComponent } from '../components/popups/account-detail/account-detail.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor() { }

  getGovDetailComponent() {
    return GovDetailComponent;
  }

  getValidatorComponent() {
    return ValidatorComponent;
  }

  getTxsListCardComponent() {
    return TxsListCardComponent;
  }

  getTxComponent() {
    return TxComponent;
  }

  getBlockComponent() {
    return BlockComponent;
  }

  getAccountDetailComponent() {
    return AccountDetailComponent;
  }
}
