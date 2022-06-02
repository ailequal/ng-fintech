import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransferRoutingModule} from './transfer-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";

import {TransferComponent} from './transfer.component';

@NgModule({
  declarations: [
    TransferComponent
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TransferModule {
}
