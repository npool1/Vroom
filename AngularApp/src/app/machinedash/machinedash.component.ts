import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-machinedash',
  templateUrl: './machinedash.component.html',
  styleUrls: ['./machinedash.component.css']
})
export class MachinedashComponent implements OnInit {

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }
  machines: any;
  id: any;

  ngOnInit() {
    this.getMachines();
  }
  getMachines(){
    let observable = this._httpService.getMachines();
    observable.subscribe(data => {
      console.log("Got our machines!", data)
      this.machines = data['data'];
      console.log(this.machines);
    });
  }
  deleteMachine(id){
    let observable = this._httpService.deleteMachine(id);
    observable.subscribe(data => {
      console.log("Deleting Machine", data)
      this._router.navigate(['/userdash']);
    });
  }
}

