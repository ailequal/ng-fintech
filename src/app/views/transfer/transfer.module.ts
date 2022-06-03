import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransferRoutingModule} from './transfer-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";

import {TransferComponent} from './transfer.component';
import {ContactsComponent} from "./components/contacts.component";
import {ContactFormComponent} from "./components/contact-form.component";
import {ContactListComponent} from "./components/contact-list.component";

@NgModule({
  declarations: [
    TransferComponent,
    ContactsComponent,
    ContactFormComponent,
    ContactListComponent
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TransferModule {
}
