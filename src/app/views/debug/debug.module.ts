import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DebugRoutingModule} from './debug-routing.module';
import {SharedModule} from "../../shared/shared.module";

import {DebugComponent} from './debug.component';

@NgModule({
  declarations: [
    DebugComponent
  ],
  imports: [
    CommonModule,
    DebugRoutingModule,
    SharedModule
  ],
  exports: []
})
export class DebugModule {
}
