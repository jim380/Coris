import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { ValidatorsComponent } from './components/validators/validators.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { TxsComponent } from './components/txs/txs.component';
import { GovernanceComponent } from './components/governance/governance.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { TestComponent } from './components/test/test.component';
// import { BlockComponent } from './components/popups/block/block.component';
// import { TxComponent } from './components/popups/tx/tx.component';
// import { ValidatorComponent } from './components/popups/validator/validator.component';

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

  // { path: 'block/:height', component: BlockComponent },
  // { path: 'tx/:hash', component: TxComponent },
  // { path: 'validators/:address', component: ValidatorComponent },
  // { path: 'validators/:address', component: TestComponent },
  // { path: 'new/tx/:delegator', component: NewTxComponent },
  // { path: 'test', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
