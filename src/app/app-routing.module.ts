import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidatorsComponent } from './validators/validators.component';
import { LastBlockComponent } from './last-block/last-block.component';
import { BlockComponent } from './block/block.component';
import { BlocksComponent } from './blocks/blocks.component';
import { TxComponent } from './tx/tx.component';
import { TxsComponent } from './txs/txs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ValidatorComponent } from './validator/validator.component';
import { NewTxComponent } from './new-tx/new-tx.component';


const routes: Routes = [
  { path: '', redirectTo: '/validators', pathMatch: 'full'},
  { path: 'validators', component: ValidatorsComponent },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'block/:height', component: BlockComponent },
  { path: 'last-block', component: LastBlockComponent },
  { path: 'blocks', component: BlocksComponent },
  { path: 'tx/:hash', component: TxComponent },
  { path: 'txs', component: TxsComponent },
  { path: 'validator/:address', component: ValidatorComponent },
  { path: 'new/tx/:delegator', component: NewTxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
