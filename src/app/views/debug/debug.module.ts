import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DebugRoutingModule} from './debug-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../shared/material/material.module";

import {DebugComponent} from './debug.component';
import {SignInComponent} from "../login/sign-in.component";
import {RegisterComponent} from '../login/register.component';
import {LoginComponent} from '../login/login.component';
import {CardListComponent} from '../cards/card-list.component';
import {CardFormComponent} from '../cards/card-form.component';
import {CardsComponent} from '../cards/cards.component';
import {MovementComponent} from '../movements/movement.component';
import {MovementsComponent} from '../movements/movements.component';
import {TransferComponent} from '../transfer/transfer.component';
import {DialogConfirmComponent} from '../../shared/components/dialog-confirm.component';
import {ContactsComponent} from '../movements/components/contacts.component';
import {ContactListComponent} from '../movements/components/contact-list.component';
import {ContactFormComponent} from '../movements/components/contact-form.component';
import {AppointmentsComponent} from '../appointments/appointments.component';
import {AppointmentFormComponent} from '../appointments/components/appointment-form.component';
import {AppointmentListComponent} from '../appointments/components/appointment-list.component';
import {LeafletComponent} from '../../shared/components/leaflet.component';

@NgModule({
  declarations: [
    DebugComponent,
    SignInComponent,
    RegisterComponent,
    LoginComponent,
    CardListComponent,
    CardFormComponent,
    CardsComponent,
    MovementComponent,
    MovementsComponent,
    TransferComponent,
    DialogConfirmComponent,
    ContactsComponent,
    ContactListComponent,
    ContactFormComponent,
    AppointmentsComponent,
    AppointmentFormComponent,
    AppointmentListComponent,
    LeafletComponent
  ],
  imports: [
    CommonModule,
    DebugRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ],
  exports: []
})
export class DebugModule {
}
