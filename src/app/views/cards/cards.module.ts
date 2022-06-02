import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardsRoutingModule} from './cards-routing.module';

import {CardsComponent} from './cards.component';
import {CardFormComponent} from "./components/card-form.component";
import {CardListComponent} from "./components/card-list.component";

@NgModule({
  declarations: [
    CardsComponent,
    CardFormComponent,
    CardListComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule
  ]
})
export class CardsModule {
}
