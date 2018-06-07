import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-addmaintenance',
  templateUrl: './addmaintenance.component.html',
  styleUrls: ['./addmaintenance.component.css']
})
export class AddmaintenanceComponent implements OnInit {
newMaintenance;
myErrors;
  constructor(private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router) {}

  ngOnInit() {
    this.newMaintenance={action:"",
      mechanic:"",
      pdf:"",
      compDate:"",
      dueDate:"",
      completed:""
    }
  }
  addMaintenanceForm(){
    console.log("Hit on addMaintenanceForm()")
    let observable = this._httpService.addMaintenance(this.newMaintenance);
    console.log(this.newMaintenance)
    observable.subscribe(data =>{
      if(data['errors']){
        this.myErrors=data['errors']
        console.log(this.myErrors, 'ohno!', this.newMaintenance)
    }
    else{
    this.newMaintenance={action:"",
    mechanic:"",
    pdf:"",
    compDate:"",
    dueDate:"",
    completed:""
  }
    console.log(data)
    this._router.navigate(['/home'])
  }
})
  }
  
}
