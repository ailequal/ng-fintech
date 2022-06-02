import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login.component';
import {SignInComponent} from "./components/sign-in.component";
import {RegisterComponent} from "./components/register.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: 'signin',
        component: SignInComponent,
        pathMatch: 'full'
      },
      {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
