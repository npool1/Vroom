import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserdashComponent } from './userdash/userdash.component';
import { MachinedashComponent } from './machinedash/machinedash.component';
import { AddmachineComponent } from './addmachine/addmachine.component';
import { AddmaintenanceComponent } from './addmaintenance/addmaintenance.component';
import { MaintenancedashComponent } from './maintenancedash/maintenancedash.component';

@NgModule({
  declarations: [
    AppComponent,
    UserdashComponent,
    MachinedashComponent,
    AddmachineComponent,
    AddmaintenanceComponent,
    MaintenancedashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
