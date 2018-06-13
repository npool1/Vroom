import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-addmaintenance',
  templateUrl: './addmaintenance.component.html',
  styleUrls: ['./addmaintenance.component.css']
})
export class AddmaintenanceComponent implements OnInit {
maintenance;
myErrors = [];
User: any;
machine: any;
maintenancerecord: any;
array = [];
  constructor(private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router) {
      
      this.maintenance = {
        technician:"",
        description:"",
        completedon:"",
        duedate:"",
        finished:""
      }
    
    
    }
  ngOnInit(){

  }
  addMaintenanceForm(){
    console.log("Hit on addMaintenanceForm()")
    let observable = this._httpService.addMaintenance(this.maintenance);
    console.log(this.maintenance)
    observable.subscribe(data =>{
      if(data['errors']){
        this.myErrors=data['errors']
        console.log(this.myErrors, 'ohno!', this.maintenance)
        console.log(data)
        for (let error in data['errors']){
          this.myErrors.push(data['errors'][error].message)
          console.log("PARSING data[errors] : val : " + error);
          console.log("line 54"+this.myErrors);
        }
    }
    else{
      console.log(data)
      this._router.navigate(['/userdash'])

    }
  })
  this.maintenance={
    technician:"",
    description:"",
    duedate:"",
    completedon:"",
    finished:""
    }
  }
  
}
