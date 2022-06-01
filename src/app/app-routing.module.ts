import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from "./shared/components/navigation.component";

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent
  },
  {
    path: 'debug',
    loadChildren: () => import('./features/debug/debug.module').then(m => m.DebugModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
