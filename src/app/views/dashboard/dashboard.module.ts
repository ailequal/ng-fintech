import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from "../../shared/shared.module";

import {DashboardComponent} from './dashboard.component';
import {DashboardListComponent} from "./components/dashboard-list.component";
import {DashboardSidenavComponent} from "./components/dashboard-sidenav.component";
import {DashboardToolbarComponent} from "./components/dashboard-toolbar.component";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardListComponent,
    DashboardSidenavComponent,
    DashboardToolbarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule {
}
