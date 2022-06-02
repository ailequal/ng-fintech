import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaxesRoutingModule} from './taxes-routing.module';
import {SharedModule} from "../../shared/shared.module";

import {TaxesComponent} from './taxes.component';

@NgModule({
  declarations: [
    TaxesComponent
  ],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    SharedModule
  ]
})
export class TaxesModule {
}
