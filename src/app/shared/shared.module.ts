import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrimWordsPipe} from './pipes/trim-words.pipe';

@NgModule({
  declarations: [
    TrimWordsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrimWordsPipe
  ]
})
export class SharedModule {
}
