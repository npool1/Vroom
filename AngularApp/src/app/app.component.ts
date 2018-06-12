import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vroom';
  userloggedin = false;
  showLoginForm = true;
  showRegisterForm = false;
  user: any;
  error: any;
  error_Present: any;
  user_in_session: any;
  newuser: any;
  pwdconfirm: any;
  pwderror: any;
  pwderror_Present: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router){}

  ngOnInit() {
    this.user = { username: "", password: ""};
    this.newuser = { username: "", firstname: "", lastname: "", password: ""};
  }

  onLoginSubmit() {
    this.error_Present = false;
    console.log("in onLoginSubmit, user:  ", this.user)
    let observable = this._httpService.loginUser(this.user);
    observable.subscribe(data => {
      if (data['message'] != "Success"){
        this.error_Present = true;
        this.error = data['data']['errors']['username'];
      } else {
        // ask the server for the user in session
        console.log("asking the server for the user in session")
        let observable = this._httpService.getUser();
        observable.subscribe(data => {
          this.user_in_session = data['user'];
          this.userloggedin = true;
          console.log("user in session: ", this.user_in_session);
          this._router.navigate(['userdash']);
        })
      }
    })
  }

  onRegisterRequest() {
    this.showRegisterForm = true;
    this.showLoginForm = false;
  }

  onRegisterSubmit() {
    this.error_Present = false;
    this.pwderror_Present = false;
    if (this.newuser['password'] != this.pwdconfirm){
      this.pwderror = "Password and Confirmation do not match";
      this.pwderror_Present = true;
    } else {
      console.log("this.newuser:" , this.newuser);
      console.log("pwdconfirm: ", this.pwdconfirm);
      console.log("password: ", this.user['password']);
      let observable = this._httpService.createUser(this.newuser);
      observable.subscribe(data => {
        if (data['message'] != "Success"){
          this.error_Present = true;
          this.error = data['data']['errors'];
          console.log(this.error);
        } else {
          // ask the server for the user in session
          console.log("asking the server for the user in session")
          let observable = this._httpService.getUser();
          observable.subscribe(data => {
            this.user_in_session = data['user'];
            this.userloggedin = true;
            console.log("user in session: ", this.user_in_session);
            this._router.navigate(['userdash']);
          })
        }
      })
    }
  }

  onLogoff(){
    this.userloggedin = false;
    this.user = { username: "", password: ""};
    this.newuser = { username: "", firstname: "", lastname: "", password: ""};
    this.showLoginForm = true;
    this.showRegisterForm = false;
    // tell server to remove user from session
    let observable = this._httpService.logoff();
    observable.subscribe(data => {
      this.user_in_session = data['user'];
      console.log("logoff - from server data: ", data);
    })
    this._router.navigate(['/']);
    }

}
