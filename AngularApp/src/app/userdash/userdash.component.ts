import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.css']
})
export class UserdashComponent implements OnInit {

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }
  user: any;
  user_in_session: any;
  userloggedin = false;
  ngOnInit() {
    let observable = this._httpService.getUser();
    observable.subscribe(data =>{
      this.user_in_session = data['user']
      console.log(this.user_in_session, "Here!")
      if (this.user_in_session['username']==""){
        console.log("username is null");
        this.userloggedin = false;
      } else {
        console.log("username: ", this.user_in_session['username']);
        this.userloggedin = true;
      }
    })
  }

}
