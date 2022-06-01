import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrimWordsPipe} from './pipes/trim-words.pipe';
import {FilterPipe} from './pipes/filter.pipe';
import {NavigationComponent} from './components/navigation.component';
import {NavigationListComponent} from './components/navigation-list.component';
import {NavigationToolbarComponent} from './components/navigation-toolbar.component';
import {NavigationSidenavComponent} from './components/navigation-sidenav.component';

@NgModule({
  declarations: [
    TrimWordsPipe,
    FilterPipe,
    NavigationComponent,
    NavigationListComponent,
    NavigationToolbarComponent,
    NavigationSidenavComponent
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
