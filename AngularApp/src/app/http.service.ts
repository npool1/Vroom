import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  createUser(user){
    console.log("in HttpService createUser, user: ", user);
    return this._http.post('/register',user);
  }

  loginUser(user){
    console.log("in HttpService loginUser, user: ", user);
    return this._http.post('/login',user);
  }
  addMachine(machine){
    console.log("in HttpService addMachine, machine: ", machine);
    return this._http.post('/addmachine', machine)
  }

  getUser(){
    console.log("about to ask server for the user");
    return this._http.get('/user');
  }
  
  addMaintenance(addMaintenance){
    console.log("in HttpService addMaintenance, maintenance: ", addMaintenance);
    return this._http.post("/addmaintenance", addMaintenance)
  }
  deleteMachine(id){
    console.log("in service deleteMachine");
   return this._http.delete("/machine/" + id);
  }

 



  getMachines(){
    console.log("in service getMachines");
    return this._http.get("/allmachines");
  }

  logoff(){
    console.log("in service logoff");
    return this._http.get("/logoff")
  }
}


