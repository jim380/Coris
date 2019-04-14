import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { ValidatorsComponent } from './components/validators/validators.component';
import { LastBlockComponent } from './components/last-block/last-block.component';
import { BlockComponent } from './components/block/block.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { TxComponent } from './components/tx/tx.component';
import { TxsComponent } from './components/txs/txs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ValidatorComponent } from './components/validator/validator.component';
import { NewTxComponent } from './components/new-tx/new-tx.component';
import { GovernanceComponent } from './components/governance/governance.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled'
};

const routes: Routes = [
  { path: '', redirectTo: '/validators', pathMatch: 'full'},
  { path: 'validators', component: ValidatorsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'block/:height', component: BlockComponent },
  { path: 'last-block', component: LastBlockComponent },
  { path: 'blocks', component: BlocksComponent },
  { path: 'tx/:hash', component: TxComponent },
  { path: 'txs', component: TxsComponent },
  { path: 'validator/:address', component: ValidatorComponent },
  { path: 'new/tx/:delegator', component: NewTxComponent},
  { path: 'gov', component: GovernanceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
