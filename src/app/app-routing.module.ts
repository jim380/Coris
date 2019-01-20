import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidatorsComponent } from './validators/validators.component';
import { LastBlockComponent } from './last-block/last-block.component';
import { BlocksComponent } from './blocks/blocks.component';
import { TxsComponent } from './txs/txs.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'validators', component: ValidatorsComponent },
  { path: 'last-block', component: LastBlockComponent },
  { path: 'blocks', component: BlocksComponent },
  { path: 'txs', component: TxsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
