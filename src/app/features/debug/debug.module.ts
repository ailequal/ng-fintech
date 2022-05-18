import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DebugRoutingModule} from './debug-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../shared/material/material.module";

import {DebugComponent} from './debug.component';
import {SignInComponent} from "../../views/sign-in.component";
import {RegisterComponent} from '../../views/register.component';
import {AddressFormComponent} from '../../views/address-form.component';
import {LoginComponent} from '../../views/login.component';
import {CardListComponent} from '../../views/card-list.component';
import {CardFormComponent} from '../../views/card-form.component';
import {CardsComponent} from '../../views/cards.component';

@NgModule({
  declarations: [
    DebugComponent,
    SignInComponent,
    RegisterComponent,
    AddressFormComponent,
    LoginComponent,
    CardListComponent,
    CardFormComponent,
    CardsComponent
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
