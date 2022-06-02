import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {WelcomeComponent} from "./components/welcome.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'cards',
        loadChildren: () => import('../cards/cards.module').then(m => m.CardsModule),
        pathMatch: 'full'
      },
      {
        path: 'movements',
        loadChildren: () => import('../movements/movements.module').then(m => m.MovementsModule),
        pathMatch: 'full'
      },
      {
        path: 'transfer',
        loadChildren: () => import('../transfer/transfer.module').then(m => m.TransferModule),
        pathMatch: 'full'
      },
      {
        path: 'appointments',
        loadChildren: () => import('../appointments/appointments.module').then(m => m.AppointmentsModule),
        pathMatch: 'full'
      },
      {
        path: 'taxes',
        loadChildren: () => import('../taxes/taxes.module').then(m => m.TaxesModule),
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
