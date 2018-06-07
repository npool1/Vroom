import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  error: any;
  error_Present: any;
  user_in_session: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.user = { username: "", password: ""};
  }

  onSubmit() {
    this.error_Present = false;
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
          this._router.navigate(['userdash']);
          // this._router.navigate(['login']);
        })
      }
    })
  }

}
