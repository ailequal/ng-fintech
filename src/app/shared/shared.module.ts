import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "./material/material.module";

import {FilterPipe} from './pipes/filter.pipe';
import {NavigationComponent} from '../views/dashboard/navigation.component';
import {NavigationListComponent} from '../views/dashboard/navigation-list.component';
import {NavigationSidenavComponent} from '../views/dashboard/navigation-sidenav.component';
import {NavigationToolbarComponent} from '../views/dashboard/navigation-toolbar.component';
import {TrimWordsPipe} from './pipes/trim-words.pipe';

@NgModule({
  declarations: [
    NavigationComponent,
    NavigationListComponent,
    NavigationToolbarComponent,
    NavigationSidenavComponent,
    TrimWordsPipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    NavigationComponent,
    TrimWordsPipe,
    FilterPipe
  ]
})
export class SharedModule {
}
