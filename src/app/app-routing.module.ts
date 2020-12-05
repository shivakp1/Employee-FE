import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './screens/login/login.component';
import {RegistrationComponent} from './screens/registration/registration.component';
import {HomeComponent} from './screens/home/home.component';
import {ListEmployeesComponent} from './screens/list-employees/list-employees.component';

const routes: Routes = [
  {
  path: '',
  component: LoginComponent
},
  {
    path: 'employee',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'registration',
        pathMatch: 'full',
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'list-employees',
        component: ListEmployeesComponent
      }
    ],
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
