import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovementsRoutingModule} from './movements-routing.module';
import {SharedModule} from "../../shared/shared.module";

import {MovementsComponent} from './movements.component';
import {MovementComponent} from "./components/movement.component";

@NgModule({
  declarations: [
    MovementsComponent,
    MovementComponent
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    SharedModule
  ]
})
export class MovementsModule {
}
