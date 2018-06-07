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
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddmaintenanceComponent } from './addmaintenance/addmaintenance.component';

@NgModule({
  declarations: [
    AppComponent,
    UserdashComponent,
    MachinedashComponent,
    AddmachineComponent,
    LoginComponent,
    RegisterComponent,
    AddmaintenanceComponent
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
