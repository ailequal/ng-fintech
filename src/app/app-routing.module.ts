import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from "./views/dashboard/navigation.component";

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent
  },
  {
    path: 'debug',
    loadChildren: () => import('./views/debug/debug.module').then(m => m.DebugModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
