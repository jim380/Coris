import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { ValidatorsComponent } from './components/explorer/validators/validators.component';
import { BlocksComponent } from './components/explorer/blocks/blocks.component';
import { TxsComponent } from './components/explorer/txs/txs.component';
import { GovernanceComponent } from './components/explorer/governance/governance.component';

// import { FaucetComponent } from './components/faucet/faucet.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';

import { BlockComponent } from './components/explorer/blocks/block/block.component';
import { TxComponent } from './components/explorer/txs/tx/tx.component';
import { ValidatorComponent } from './components/explorer/validators/validator/validator.component';
import { AccountDetailComponent } from './components/explorer/account/account-detail.component';
import { GovDetailComponent } from './components/explorer/governance/proposal/gov-detail.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled'
};

const routes: Routes = [
  { path: '', redirectTo: '/validators', pathMatch: 'full'},
  { path: 'validators', component: ValidatorsComponent },
  { path: 'validators/:address', component: ValidatorComponent },
  { path: 'blocks', component: BlocksComponent },
  { path: 'blocks/:height', component: BlockComponent },
  { path: 'txs', component: TxsComponent },
  { path: 'txs/:hash', component: TxComponent },
  { path: 'proposals', component: GovernanceComponent },
  { path: 'proposals/:id', component: GovDetailComponent },
  { path: 'account/:address', component: AccountDetailComponent },

  { path: '**', redirectTo:'/validators' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
