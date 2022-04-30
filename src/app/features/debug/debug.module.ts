import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DebugRoutingModule} from './debug-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../shared/material/material.module";

import {DebugComponent} from './debug.component';
import {SignInComponent} from "../../views/sign-in.component";
import {RegisterComponent} from '../../views/register.component';

@NgModule({
  declarations: [
    DebugComponent,
    SignInComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    DebugRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    MaterialModule
  ]
})
export class DebugModule {
}
