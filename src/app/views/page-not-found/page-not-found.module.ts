import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {PageNotFoundRoutingModule} from './page-not-found-routing.module';

import {PageNotFoundComponent} from './page-not-found.component';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PageNotFoundRoutingModule
  ]
})
export class PageNotFoundModule {
}
