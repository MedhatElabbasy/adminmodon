import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Routing } from 'src/app/modules/core/routes/app-routes';
import { dashboard } from '../../model/dashboard';
import { notify } from '../../model/notification';
import { DashboardService } from '../../services/dashboard.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
dashboard!:dashboard
numberOfSuperVisors!:number
sum = 10; 
throttle = 1000;  
scrollDistance = 1;  
scrollUpDistance = 100;  
direction = "";  
modalOpen = false;  
temp!:notify[]  
start: number = 1  
AllNotify:any[]=[]
total:number=0
date:any
img:any


links = {
  companies: `/${Routing.companies.module}/${Routing.companies.children.manageAccounts}`,
  clients:`/${Routing.clients}`,
  rasdComplains:`/${Routing.lookups.module}/${Routing.lookups.children.MonitoringComplaints}`,
  rasdUsers: `/${Routing.lookups.module}/${Routing.lookups.children.customerManagement}`,
  contracts:`/${Routing.contracts.module}`

};

  constructor(private _dashboard:DashboardService ,private _date:DatePipe, private _http:HttpClient, private _notify:NotificationService) { 
  }

  ngOnInit(): void {
    this.getAllDashboardData();
    this. getnotify();
  }

  getAllDashboardData(){
    this._dashboard.all().subscribe((res)=>{
      this.dashboard=res
      console.log(this.dashboard);
      this.numberOfSuperVisors=this.dashboard.numberOfSupervisorFemale + this.dashboard.numberOfSupervisorMale
    });
  }

  
  getnotify() {
    this._notify.notification(this.start,10).subscribe((response: any) => {   
      if (response) {
        this.hideloader();
    }
      this.temp = response.data 
      this.total=response.totalCount
      this.addphotos(this.start, this.sum);  
    });
  }
  addphotos(index: number, sum: number) {
    for (let i = 0; i < sum; i++) {  
      if(this.temp[i]!= null){
      this.AllNotify.push(this.temp[i]); 
     }
     } 
    
  }

  onScrollDown(){
    console.log("scrolldown");
    this.start = this.start+1; 
    console.log(this.start,this.sum);
    this.getnotify();  
    this.direction = "down";  
    }

    hideloader(){
      document.getElementById('loading')!
          .style.display = 'none';
  }

 

}
