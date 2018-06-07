import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-addmachine',
  templateUrl: './addmachine.component.html',
  styleUrls: ['./addmachine.component.css']
})
export class AddmachineComponent implements OnInit {

  User: any;
  machine: any;
  maintenancerecord: any;
  array = [];

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) {
  this.machine = {
    name:'',
    make: '',
    model: '',
    yearpurchased: '',
    yearmanufactured: '',
    maintenancerecords: []
  }
  this.maintenancerecord = {
    technician: '',
    description: '',
    completedon: '',
    duedate: '',
    finished: ''
  }
}

  ngOnInit() {
  }
  check(){
    console.log("in check() addmachine.component:", this.machine);
    this.machine.maintenancerecords.push(this.maintenancerecord);
    let observable = this._httpService.addMachine(this.machine);
    observable.subscribe(data =>{
      if( data['errors']){
        console.log(data['errors']);
        // console.log(data['errors']);
        this.array = [];
        // this.array.push(data['errors']['name']['message']);
        // this.array.push(data['errors']['cuisine']['message']);
        // console.log(data['errors']['errors']['name'])
        console.log(data)
        for (let error in data['errors']){
          this.array.push(data['errors'][error].message)
          console.log("PARSING data[errors] : val : " + error);
          console.log(this.array);
        }
        }else{
        console.log("save response from server: ", data['status']);
      this._router.navigate(['']);
      }
    })
    this.machine = {make: '', model: '', yearpurchased: '', yearmanufactured: '', maintenancerecords: []}
  }

}
