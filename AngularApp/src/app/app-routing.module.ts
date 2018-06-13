import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserdashComponent } from './userdash/userdash.component';
import { MachinedashComponent } from './machinedash/machinedash.component';
import { MaintenancedashComponent } from './maintenancedash/maintenancedash.component';
import { AddmachineComponent } from './addmachine/addmachine.component';
import { AddmaintenanceComponent } from './addmaintenance/addmaintenance.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/'},
  { path: 'userdash',component: UserdashComponent },
  { path: 'machinedash',component: MachinedashComponent },
  { path: 'maintenancedash',component: MaintenancedashComponent },
  { path: 'userdash/addmachine',component: AddmachineComponent },
  {path: 'addmaintenance', component: AddmaintenanceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
