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

}
