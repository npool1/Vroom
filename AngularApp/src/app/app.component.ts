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

  // Flags to control what is displayed
  userloggedin = false;
  showLoginForm = true;
  showRegisterForm = false;

  // User data linked to forms
  user: any;
  newuser: any;
  
  // object returned from server with mongodb user object for user in session
  user_in_session: any;
  
  // flags and associated error messages
  loginError: any;
  loginErrorPresent: any;

  // backend register errors
  registerErrors: any;
  registerErrorPresent: any;

  // frontend register errors
  registerDataValid: any;
  pwdConfirm: any;
  pwdError: any;
  pwdErrorPresent: any;
  usernameError: any;
  usernameErrorPresent: any;
  firstnameError: any;
  firstnameErrorPresent: any;
  lastnameError: any;
  lastnameErrorPresent: any;
  passwordError: any;
  passwordErrorPresent: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router){}

  ngOnInit() {
    this.user = { username: "", password: ""};
    this.newuser = { username: "", firstname: "", lastname: "", password: ""};
  }

  onLoginSubmit() {
    this.loginErrorPresent = false;
    console.log("in onLoginSubmit, user:  ", this.user)
    let observable = this._httpService.loginUser(this.user);
    observable.subscribe(data => {
      if (data['message'] != "Success"){
        this.loginErrorPresent = true;
        this.loginError = data['data']['errors']['username'];
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
    // this is called when the user hits the link to
    // register a new user. It sets the flags so that
    // registration form will be displayed instead of the
    // login form.
    this.showRegisterForm = true;
    this.showLoginForm = false;
    this.registerErrorPresent = false;
    this.pwdErrorPresent = false;
    this.loginErrorPresent = false;
    this.newuser = { username: "", firstname: "", lastname: "", password: ""};
    this.pwdConfirm = "";
    this.usernameErrorPresent = false;
    this.firstnameErrorPresent = false;
    this.lastnameErrorPresent = false;
    this.passwordErrorPresent = false;
    }

  onRegisterSubmit() {
    // this is called when the user hits the submit button on
    // the registration form
    this.frontEndValidations();

    this.registerErrorPresent = false;  // flag for backend validations

    if (this.registerDataValid) {       // passed front end validations
      console.log("this.newuser:" , this.newuser);
      let observable = this._httpService.createUser(this.newuser);
      observable.subscribe(data => {
        if (data['message'] != "Success"){
          // somehow errors snuck through the front end
          // so need to display back end errors
          this.registerErrorPresent = true;
          this.registerErrors = data['data']['errors'];
          console.log("register error", this.registerErrors);
        } else {
          // Successfuly registered user

          // ask the server for the user object for the user in session
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

  frontEndValidations() {
    console.log("in front end validations, this.newuser: ", this.newuser);
    // init front end error flag to false
    // use one overall flag to save complicated if check in onRegisterSubmit
    this.registerDataValid = true; 

    // set individual error flags for benefit of HTML
    this.usernameErrorPresent = false;
    if (this.newuser['username'].length < 3){
      this.usernameErrorPresent = true;
      this.usernameError = "Username must be at least 3 characters"
      this.registerDataValid = false;
    }

    this.firstnameErrorPresent = false;
    if (this.newuser['firstname'].length < 3){
      this.firstnameErrorPresent = true;
      this.firstnameError = "First name must be at least 3 characters"
      this.registerDataValid = false;
    }

    this.lastnameErrorPresent = false;
    if (this.newuser['lastname'].length < 3){
      this.lastnameErrorPresent = true;
      this.lastnameError = "Last name must be at least 3 characters"
      this.registerDataValid = false;
    }

    this.passwordErrorPresent = false;
    if (this.newuser['password'].length < 3){
      this.passwordErrorPresent = true;
      this.passwordError = "Password must be at least 8 characters"
      this.registerDataValid = false;
    }

    this.pwdErrorPresent = false;
    if (this.newuser['password'] != this.pwdConfirm){
      this.pwdError = "Password and Confirmation do not match";
      this.pwdErrorPresent = true;
      this.pwdConfirm = "";
      this.registerDataValid = false;
    }
  }

  onRegistrationCancel(){
    this.showRegisterForm = false;
    this.showLoginForm = true;
    this.registerErrorPresent = false;
    this.pwdErrorPresent = false;
    this.loginErrorPresent = false;
    this.newuser = { username: "", firstname: "", lastname: "", password: ""};
    this.pwdConfirm = "";
    this.usernameErrorPresent = false;
    this.firstnameErrorPresent = false;
    this.lastnameErrorPresent = false;
    this.passwordErrorPresent = false;    
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

