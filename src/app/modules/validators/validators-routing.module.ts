import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidatorsTableComponent } from './components/validators-table/validators-table.component';

const routes: Routes = [
  {
    path: '',
    component: ValidatorsTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidatorsRoutingModule { }
