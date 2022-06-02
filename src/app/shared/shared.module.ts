import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
    MaterialModule
  ],
  exports: [
    MaterialModule,
    DialogConfirmComponent,
    LeafletComponent,
    FilterPipe,
    TrimWordsPipe
  ]
})
export class SharedModule {
}
