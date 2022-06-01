import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "./material/material.module";

import {FilterPipe} from './pipes/filter.pipe';
import {NavigationComponent} from './components/navigation.component';
import {NavigationListComponent} from './components/navigation-list.component';
import {NavigationSidenavComponent} from './components/navigation-sidenav.component';
import {NavigationToolbarComponent} from './components/navigation-toolbar.component';
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
