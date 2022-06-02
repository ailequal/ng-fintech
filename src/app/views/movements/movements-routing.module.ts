import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MovementsComponent} from './movements.component';

const routes: Routes = [
  {
    path: '',
    component: MovementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementsRoutingModule {
}
