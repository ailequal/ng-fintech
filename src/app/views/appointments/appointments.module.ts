import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppointmentsRoutingModule} from './appointments-routing.module';

import {AppointmentsComponent} from './appointments.component';
import {AppointmentFormComponent} from "./components/appointment-form.component";
import {AppointmentListComponent} from "./components/appointment-list.component";

@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointmentFormComponent,
    AppointmentListComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule
  ]
})
export class AppointmentsModule {
}
