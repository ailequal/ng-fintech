import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrimWordsPipe} from './pipes/trim-words.pipe';
import {FilterPipe} from './pipes/filter.pipe';

@NgModule({
  declarations: [
    TrimWordsPipe,
    FilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrimWordsPipe,
    FilterPipe
  ]
})
export class SharedModule {
}
