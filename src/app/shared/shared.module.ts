import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material/material.module";

import {FilterPipe} from './pipes/filter.pipe';
import {TrimWordsPipe} from './pipes/trim-words.pipe';

@NgModule({
  declarations: [
    TrimWordsPipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    TrimWordsPipe,
    FilterPipe
  ]
})
export class SharedModule {
}
