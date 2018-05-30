import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserdashComponent } from './userdash/userdash.component';
import { MachinedashComponent } from './machinedash/machinedash.component';
import { AddmachineComponent } from './addmachine/addmachine.component';
import { LoginComponent} from './login/login.component';
import { RegisterComponent} from './register/register.component';

const routes: Routes = [
  { path: 'userdash',component: UserdashComponent },
  { path: 'machinedash',component: MachinedashComponent },
  { path: 'addmachine',component: AddmachineComponent },
  { path: 'login',component: LoginComponent },
  { path: 'register',component: RegisterComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
