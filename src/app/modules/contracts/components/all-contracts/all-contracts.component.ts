import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContractStatus } from 'src/app/modules/core/enum/status.enum';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Contract } from '../../models/contract';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-all-contracts',
  templateUrl: './all-contracts.component.html',
  styleUrls: ['./all-contracts.component.scss'],
})
export class AllContractsComponent implements OnInit {
  contracts!: Contract[];
  searchKey = '';
  total!: number;
  language : string ='';
  pageSize = 10;
  pageNumber = 1;
  sizes = [5, 10, 20, 30];
  contractType:any [] = [];
  canvasDetails = 'contract-details';
  selectedContract!: Contract;
  status = ContractStatus;
  items:any []=[];
  item =0
  contractID!:number
  modalID="deleteContract"
  refuseForm = new FormGroup({
    reason: new FormControl(null, [Validators.required]),
  });
  typingTimer!: any;                //timer identifier
  doneTypingInterval = 500;
  key=""
  constructor(
    private route: ActivatedRoute,
    public lang: LangService,
    private contractService: ContractsService,
    public canvas: OffcanvasService,
    public modalService:ModalService
  ) {
    
  }
  get reason(): any {
   
    return this.refuseForm.get('reason');
    
  }

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData() {
    let data: Pagination<Contract> = this.route.snapshot.data['contracts'];
    this.contracts=data.data;
    console.log("init");
    
    this.total = data.totalCount;
      this.contracts.map((e) => {
        if (e.contractStatus.value == 3) {
          e.active = true;
        } else {
          e.active = false;
        }
      });
   

      this.contractService.getContractType().subscribe((x)=>
      {console.log(x);
        this.items=x.optionSetItems;
        this.items.forEach((ele)=>console.log(ele.color))
        
      });

      
    
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
   this.getAll();
  }

  onPageNumber(event: number) {
    this.pageNumber = event;
   this.getAll();
  }

  getAll(){
    if(this.key==""){
      if(this.item != null){ 
        this.getByType();
      }else {
      this.getContracts();
      }
    }else if(this.key!=""){
      this.doneTyping(this.key)
    }
  }

  accept(id: number) {
    this.contractService
      .updateStatus(id, ContractStatus.acceptedByTakid)
      .subscribe(() => this.getContracts());
  }

  reject(id: number) {
    this.contractID=id
    this.openModal(this.modalID);
    
  }

  confirmDelete(){
    if (this.refuseForm.invalid) return;
    console.log(this.refuseForm.controls['reason'].value);
    this.contractService
      .updateRejectedReason(this.contractID, ContractStatus.rejectedByTakid,this.refuseForm.controls['reason'].value)
      .subscribe((res) => {this.getContracts()
      console.log(res);
      });
      this.closeModal(this.modalID)
  }

  getContracts() {
    this.contractService
      .getAll(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        console.log(res);
        
        this.contracts = res.data;
        console.log(this.contracts);
        console.log("1");
        
        this.contracts.map((e) => {
          if (e.contractStatus.value == 3) {
            e.active = true;
          } else {
            e.active = false;
          }
        });
        this.contracts=this.contracts.filter((x)=> x.contractType != null)
        console.log(this.contracts);
        console.log("2");
        if(this.language == ''){
          this.contracts;
        }else if (this.language == 'english') {
          var x = [];
          var y = [];

          const regex = /^[A-Za-z]/;
          for (let i = 0; i < this.contracts.length; i++) {
            if (this.contracts[i].securityCompany.name.toLowerCase().match(regex)) {
              x.push(this.contracts[i]);
            }else{
              y.push(this.contracts[i]);
            }
          }
          this.contracts = [...x.sort(),...y.sort()];
          x.sort((a, b) => (a.securityCompany.name.toLowerCase() < b.securityCompany.name.toLowerCase() ? -1 : 1));
          y.sort((a, b) => (a.securityCompany.name < b.securityCompany.name ? -1 : 1));
          this.contracts = [...x,...y];
         
        } else if (this.language == 'arabic'){
          var x = [];
          var y = [];
          const regex = /^[ء-ي]/;
          for (let i = 0; i < this.contracts.length; i++) {
            if (this.contracts[i].securityCompany.name.match(regex)) {
              x.push(this.contracts[i]);
            }else{
              y.push(this.contracts[i]);
            }
          }
          this.contracts = [...x.sort(),...y.sort()];
          x.sort((a, b) => (a.securityCompany.name < b.securityCompany.name ? -1 : 1));
          y.sort((a, b) => (a.securityCompany.name.toLowerCase() < b.securityCompany.name.toLowerCase() ? -1 : 1));
          this.contracts = [...x,...y];
       
        }

      });
      
  }

  openDetails(contract: Contract) {
    this.selectedContract = contract;
    this.canvas.open(this.canvasDetails);
  }


getByType(){
  this.contractService.getByContractType(this.pageNumber, this.pageSize,this.item).subscribe((res)=>{
    this.contracts=res.data;
    console.log(this.contracts);
    
    this.contracts.map((e) => {
      if (e.contractStatus.value == 3) {
        e.active = true;
      } else {
        e.active = false;
      }
    });
    this.contracts=this.contracts.filter((x)=> x.contractType != null)
  })
}

  english() {
    this.language = 'english';
    this.getContracts();
  }
  arabic() {
    this.language = 'arabic';
    this.getContracts();
  }
  filter(item : number){
    this.item=item;
    console.log((this.item));
    this.getByType()
  }
  clear(){
    this.item=0
    this.language=""
    this.getContracts()
  }

  keyupFunction(event: any) {
    this.key = event.target.value;
    console.log(this.key);
     clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {this.doneTyping(this.key) }, this.doneTypingInterval);
  }

  keydownfunction() {
    clearTimeout(this.typingTimer);
    console.log(this.typingTimer);
  }

  doneTyping(key:string) {
    console.log(key);
    if(this.key == ""){
      this.getContracts();
    }else{
      this.contractService.search(this.key, this.pageNumber , this.pageSize).subscribe((res:any)=>{
        console.log(res);
        
        this.contracts=res.data;
        this.total=res.totalCount
         console.log(this.contracts);
         
        })
    }
  }
}
