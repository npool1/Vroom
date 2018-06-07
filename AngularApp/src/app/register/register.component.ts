import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any;
  pwdconfirm: any;
  // NOTE: These error messages are not working yet
  // Need to display multiple error messages
  error: any;
  error_Present: any;
  pwderror: any;
  pwderror_Present: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.user = { username: "", firstname: "", lastname: "", password: ""};
  }

  onSubmit() {
    this.error_Present = false;
    this.pwderror_Present = false;
    if (this.user['password'] != this.pwdconfirm){
      this.pwderror = "Password and Confirmation do not match";
      this.pwderror_Present = true;
    } else {
      console.log("this.user:" , this.user);
      console.log("pwdconfirm: ", this.pwdconfirm);
      console.log("password: ", this.user['password']);
      let observable = this._httpService.createUser(this.user);
      observable.subscribe(data => {
        if (data['message'] != "Success"){
          this.error_Present = true;
          this.error = data['data']['errors'];
          console.log(this.error);
        } else {
          this._router.navigate(['userdash']);
        }
      })
    }
  }

}
