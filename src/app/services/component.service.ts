import { Injectable } from '@angular/core';
import { GovDetailComponent } from '../components/explorer/governance/proposal/gov-detail.component';
import { ValidatorComponent } from '../components/explorer/validators/validator/validator.component';
import { TxsListCardComponent } from '../components/explorer/txs/txs-list-card/txs-list-card.component';
import { BlockComponent } from '../components/explorer/blocks/block/block.component';
import { TxComponent } from '../components/explorer/txs/tx/tx.component';
import { AccountDetailComponent } from '../components/explorer/account/account-detail.component';

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
