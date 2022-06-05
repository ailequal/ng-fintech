import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaxesRoutingModule} from './taxes-routing.module';
import {SharedModule} from "../../shared/shared.module";

import {TaxesComponent} from './taxes.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TaxesComponent
  ],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TaxesModule {
}
