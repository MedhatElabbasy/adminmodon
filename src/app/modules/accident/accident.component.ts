import { environment } from 'src/environments/environment';
import { Loader } from './../core/enum/loader.enum';
import { ActivatedRoute } from '@angular/router';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { convertDateToString } from '../core/core.module';
import { Accident } from './models/accident';
import { ReportsService } from './service/reports.service';
import { OptionsetService } from '../lookups/services/optionset.service';
import { OptionSetItemsService } from '../lookups/services/option-set-items.service';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.scss']
})
export class AccidentComponent implements OnInit {
  private _hubConnection!: HubConnection;
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [10, 20, 30];
  date = new FormControl(new Date());
  enddate = new FormControl(new Date());
  report!: Accident[];
  maxDate = new Date();
  yesterday!: Date;
  display: boolean = false;
  selectedGallery!: any[];
  optionsetitem:any
  filterItem:number = 0
  newdate!:any
  newEndDate!:any
  constructor(
    private reports: ReportsService,
    private auth: AuthService,
    public lang: LangService,
    private route: ActivatedRoute,
    public _optionset:OptionsetService,
    public _optionsetitems:OptionSetItemsService
  ) {
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);

    this.connectHub();
    this._optionset.getAllOptionSets().subscribe((res)=>{
     res= res.filter((res)=>{
        return res.name == "IncidentType"
      })
      console.log(res);
      res.forEach((x)=>{
        this.optionsetitem=x.optionSetItems
      })
    })
  }

  ngOnInit(): void {
    this.onDateChange();
    this.route.data.subscribe((res) => {
      this.report = res['report'];
    });
  }

  getIncident(startDate: string,endDate:string, loader: Loader) {
    this.reports.getAccidentsByDate(startDate,endDate, Loader.yes).subscribe((res) => {
      this.report = res;
      console.log(this.report);
     switch(this.filterItem){
      case(0): this.report;
      console.log("none");
      
               break;
      case(1): this.report=this.report.filter((x)=>x.incidentType.value == 1);
                console.log("111");
                
                this.filterItem=0
                break
      case(2): this.report=this.report.filter((x)=>x.incidentType.value == 2);
      console.log("222");
                this.filterItem=0
                break
      case(3): this.report=this.report.filter((x)=>x.incidentType.value == 3);
      console.log("333");
                this.filterItem=0
                break
      case(4): this.report=this.report.filter((x)=>x.incidentType.value == 4);
      console.log("444");
                this.filterItem=0
                break          
     }
      
    });
  }
filter(optionsetitem:any){
    this.filterItem=optionsetitem.value
    this.getIncident(this.newdate,this.newEndDate, Loader.yes);
}

clear(){
  this.filterItem=0
  this.getIncident(this.newdate,this.newEndDate, Loader.yes);
}


  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
  }

  connectHub() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.hub)
      .build();

    this._hubConnection
      .start()
      .then(() => {
        this._hubConnection.invoke(
          'AddToGroup',
          `${this.auth.snapshot.userInfo?.id}-incident`
        );

        this._hubConnection.on('ReceiveMessage', () => {
          let start = convertDateToString(this.date.value);
          let end =  convertDateToString(this.enddate.value);
          this.getIncident(start,end, Loader.no);
        });
      })
      .catch((err) =>
        console.log('error while establishing signalr connection')
      );
  }

  onDateChange() {
    this.date.valueChanges.subscribe((val) => {
      this.enddate.valueChanges.subscribe((value)=>{
        this.newEndDate=convertDateToString(value)
      
      this.newdate = convertDateToString(val);
      this.getIncident(this.newdate,this.newEndDate, Loader.yes);
    })
    });
  }

  openGallery(gallery: any[]) {
    this.selectedGallery = gallery;
    this.display = true;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._hubConnection.stop();
  }
}
