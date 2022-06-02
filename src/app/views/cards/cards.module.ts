import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardsRoutingModule} from './cards-routing.module';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";

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
    CardsRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class CardsModule {
}
