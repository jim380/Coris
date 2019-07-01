import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { BlocksComponent } from './components/blocks/blocks.component';
import { TxsComponent } from './components/txs/txs.component';
import { GovernanceComponent } from './components/governance/governance.component';
import { DialogEntryComponent } from './components/popups/dialog-entry.component';


const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled'
};

const routes: Routes = [
  { path: '', redirectTo: '/validators', pathMatch: 'full'},
  { 
    path: 'validators', 
    loadChildren: () => import('./modules/validators/validators.module').then(mod => mod.ValidatorsModule)    
  },
  { path: 'blocks', component: BlocksComponent },
  { path: 'txs', component: TxsComponent },
  { path: 'gov', component: GovernanceComponent },

  { path: 'block/:height', component: DialogEntryComponent },
  { path: 'tx/:hash', component: DialogEntryComponent },
  { path: 'validator/:address', component: DialogEntryComponent },
  { path: 'account/:address', component: DialogEntryComponent },
  { path: 'proposal/:id', component: DialogEntryComponent },

  { path: '**', redirectTo:'/validators' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
