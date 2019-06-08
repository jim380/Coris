import { Injectable } from '@angular/core';
import { GovDetailComponent } from '../components/governance/gov-detail/gov-detail.component';
import { ValidatorComponent } from '../components/validator/validator.component';
import { TxsListCardComponent } from '../components/txs/txs-list-card/txs-list-card.component';
import { BlockComponent } from '../components/block/block.component';
import { TxComponent } from '../components/tx/tx.component';
import { AccountDetailComponent } from '../components/account-detail/account-detail.component';

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
