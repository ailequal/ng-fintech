import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovementsRoutingModule} from './movements-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";

import {MovementsComponent} from './movements.component';
import {MovementComponent} from "./components/movement.component";
import {ContactsComponent} from "./components/contacts.component";
import {ContactFormComponent} from "./components/contact-form.component";
import {ContactListComponent} from "./components/contact-list.component";

@NgModule({
  declarations: [
    MovementsComponent,
    MovementComponent,
    ContactsComponent,
    ContactFormComponent,
    ContactListComponent
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MovementsModule {
}
