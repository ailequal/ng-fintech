import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";

import {LoginComponent} from './login.component';
import {RegisterComponent} from "./components/register.component";
import {SignInComponent} from "./components/sign-in.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class LoginModule {
}
