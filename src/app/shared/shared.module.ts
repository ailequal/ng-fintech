import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidatorsModule} from "./validators/validators.module";
import {MaterialModule} from "./material/material.module";

import {DialogConfirmComponent} from "./components/dialog-confirm.component";
import {LeafletComponent} from "./components/leaflet.component";
import {FilterPipe} from './pipes/filter.pipe';
import {TrimWordsPipe} from './pipes/trim-words.pipe';

@NgModule({
  declarations: [
    DialogConfirmComponent,
    LeafletComponent,
    FilterPipe,
    TrimWordsPipe
  ],
  imports: [
    CommonModule,
    ValidatorsModule,
    MaterialModule
  ],
  exports: [
    ValidatorsModule,
    MaterialModule,
    DialogConfirmComponent,
    LeafletComponent,
    FilterPipe,
    TrimWordsPipe
  ]
})
export class SharedModule {
}
