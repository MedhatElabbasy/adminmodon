import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PAGE_SIZES } from 'src/app/modules/core/data/page-sizes';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { SecurityGuard } from '../../models/security-gurad';
import { SecurityguardService } from '../../services/securityguard.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  pageNumber = 1;
  pageSize = 1000
  total!: number;
  sizes = [...PAGE_SIZES];
  guards: SecurityGuard[] = [];
  searchKey = '';
  jobType!: number;
  language=''
  canvasID='guardDetails'
  guradDetails:any
  sum = 10;
  start:number= 1
  Allgurads:any[]=[]
  throttle = 1000;  
scrollDistance = 1;  
scrollUpDistance = 100;  
direction = "";  
search=false;
text :string ='';
modalId="resetID"
  constructor(
    public lang: LangService,
    private route: ActivatedRoute,
    private _securitygurad:SecurityguardService,
    private modalService: ModalService,
    public _canvas:OffcanvasService
  ) {}

  ngOnInit(): void {
    this.guards = this.route.snapshot.data['guards'];
    console.log(this.guards);
    this.getguards();
  }

  // onPageSizeChange(number: any) {
  //   this.pageSize = +number.target.value;
  //   this.getguards();
  // }

  // onPageNumberChange(event: number) {
  //   this.pageNumber = event;
  //   this.getguards();
  // }

  getguards(){
    this.search=false
    this._securitygurad.GetAll(this.start,10).subscribe((res)=>{
      console.log("getguards");
      
     this.guards=res.data;
     //console.log(this.guards);
     
     this.total=res.totalCount
    // console.log(this.guards);
    // this.guards=this.guards.filter((x)=>{
    //   return x.jobTypeId==1;
    // })
    
    this.addguards(this.start, this.sum);
    
      
 
  
    // if (this.language == 'english') {
    //   var x = [];
    //   var y = [];

    //   const regex = /^[A-Z a-z]/;
    //   for (let i = 0; i < this.guards.length; i++) {
    //     if (this.guards[i].firstName.match(regex)) {
    //       x.push(this.guards[i]);
    //     } else {
    //       y.push(this.guards[i]);
    //     }
    //   }
    //   this.guards = [...x.sort(), ...y.sort()];
    //   x.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
    //   y.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
    //   this.guards = [...x, ...y];
    // } else if(this.language == 'arabic'){
    //   var x = [];
    //   var y = [];

    //   const regex = /^[ء-ي]/;
    //   for (let i = 0; i < this.guards.length; i++) {
    //     if (this.guards[i].firstName.match(regex)) {
    //       x.push(this.guards[i]);
    //     } else {
    //       y.push(this.guards[i]);
    //     }
    //   }
    //   this.guards = [...x.sort(), ...y.sort()];
    //   x.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
    //   y.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
    //   this.guards = [...x, ...y];
    // }

  });
  }

  clear(){
   this.language=''
   this.getguards();
  }
  english(){
    this.language = 'english';
    this.getguards();
  }
  arabic(){
    this.language = 'arabic';
    this.getguards();
  }
  Details(guard:SecurityGuard){
    this.guradDetails=guard
     this._canvas.open(this.canvasID)
  }
  addguards(index: number, sum: number) {
    console.log(index , sum);
    for (let i = 0; i < sum; i++) {  
     // console.log(this.guards[i]);
      
      if(this.guards[i] != null && this.guards[i].jobTypeId == 1){
      this.Allgurads.push(this.guards[i]); 
     } 
     } 
     console.log(this.Allgurads);
     if(this.Allgurads.length < 10){
      this.start=this.start+1
      if(this.search==false){
      this.getguards()}
      else{
        this.myFunction(this.text)
      }
     }
     
  }

  onScrollDown(){
    //console.log("scrolldown");
    if(this.search == true){
      console.log("search");
      
      this.start = this.start+1;
     this.searchObject()
      this.direction = "down";  
    }else{
    this.start = this.start+1;   
    console.log(this.start,this.sum);
    this.getguards() 
    this.direction = "down";  
    }
    }

    myFunction(x:any){
      this.start=1
      this.search=true
      console.log(x.target.value);
      if(x.target.value == ""){
        this.getguards()
      }
      
       this._securitygurad.text.next(x.target.value); 
      // console.log(this.text);
       //debugger
       this._securitygurad.text.subscribe((res)=>{this.text=res
       console.log(this.text);
      })
      this.Allgurads=[]
      console.log(this.Allgurads);
        this.searchObject();
    }



    searchObject(){
      console.log("object");
      this._securitygurad.search(this.text ,this.start).subscribe((res)=>{
        console.log(res);
        this.guards=res.data
        console.log(this.guards);
        this.add(this.start,10)
      })
      console.log("myfunction");
    }



    add(index: number, sum: number) {
      console.log(index , sum);
      for (let i = 0; i < sum; i++) {  
        console.log(this.guards[i]);
        
        if(this.guards[i] != null && this.guards[i].jobTypeId == 1){
        this.Allgurads.push(this.guards[i]); 
       } 
       } 
       console.log(this.Allgurads);
      
       // this.start=this.start+1
        this._securitygurad.text.subscribe((res)=>{this.text=res
          console.log(this.text);
         // this.searchObject()
         })
        
       }

       resetID(id:number){
        console.log(id);
        
        this._securitygurad.deleteID(id).subscribe((res)=>{
          console.log(res);
       this.modalService.open(this.modalId);
          
        })
      }

      closeModel(){
        this.modalService.close(this.modalId);
      }
       
    }
  




