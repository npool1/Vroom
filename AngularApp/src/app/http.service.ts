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
}
