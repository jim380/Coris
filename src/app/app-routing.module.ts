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
import { ValidatorComponent } from './components/explorer/popups/validator/validator.component';
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
  { path: 'blocks', component: BlocksComponent },
  { path: 'txs', component: TxsComponent },
  { path: 'gov', component: GovernanceComponent },

  { path: 'block/:height', component: BlockComponent },
  { path: 'tx/:hash', component: TxComponent },
  { path: 'validator/:address', component: ValidatorComponent },
  { path: 'account/:address', component: AccountDetailComponent },
  { path: 'proposal/:id', component: GovDetailComponent },

  { path: '**', redirectTo:'/validators' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
