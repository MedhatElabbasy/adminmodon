import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractStatus } from 'src/app/modules/core/enum/status.enum';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Contract } from '../../models/contract';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-accepted-contracts',
  templateUrl: './accepted-contracts.component.html',
  styleUrls: ['./accepted-contracts.component.scss'],
})
export class AcceptedContractsComponent implements OnInit {
  contracts!: Contract[];
  searchKey = '';
  pageSize = 10;
  pageNumber = 1;
  sizes = [5, 10, 20, 30];
  canvasDetails = 'contract-details';
  selectedContract!: Contract;
  language : string ='';
  item :any
  items:any []=[];
  total!: number;

  constructor(
    private route: ActivatedRoute,
    public lang: LangService,
    private contractService: ContractsService,
    public canvas: OffcanvasService
  ) {}

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData() {
    let data: Pagination<Contract> = this.route.snapshot.data['contracts'];
    this.contracts=data.data;
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

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.getContracts();
  }

  onPageNumber(event: number) {
    this.pageNumber = event;
    this.getContracts();
  }

  toggleStatus(event: boolean, contractId: number) {
    if (event) {
      this.contractService
        .updateStatus(contractId, 3)
        .subscribe(() => this.getContracts());
    } else {
      this.contractService
        .updateStatus(contractId, 4)
        .subscribe(() => this.getContracts());
    }
  }

  getContracts() {
    this.contractService
      .getAcceptedContracts(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.contracts = res.data;
        this.contracts.map((e) => {
          if (e.contractStatus.value == 3) {
            e.active = true;
          } else {
            e.active = false;
          }
        });
        this.contracts=this.contracts.filter((x)=> x.contractType != null)
        console.log(this.contracts);
        
        if(this.item=='8'){
         
          let all=this.contracts.filter((ele)=>ele.contractType.value == this.item);
          this.contracts=all;
        console.log(all);
        this.item=''

        }else if(this.item=='1'){
          let all=this.contracts.filter((ele)=>ele.contractType.value == this.item);
          this.contracts=all;
          this.item=''
        }else{ 
          this.contracts;
        }
      
        if(this.language == ''){
          this.contracts;
        }else if (this.language == 'english') {
          var x = [];
          var y = [];

          const regex = /^[A-Z a-z]/;
          for (let i = 0; i < this.contracts.length; i++) {
            if (this.contracts[i].securityCompany.name.match(regex)) {
              x.push(this.contracts[i]);
            }else{
              y.push(this.contracts[i]);
            }
          }
          this.contracts = [...x.sort(),...y.sort()];
          x.sort((a, b) => (a.securityCompany.name < b.securityCompany.name ? -1 : 1));
          y.sort((a, b) => (a.securityCompany.name < b.securityCompany.name ? -1 : 1));
          this.contracts = [...x,...y];
          this.language=''
        } else {
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
          y.sort((a, b) => (a.securityCompany.name < b.securityCompany.name ? -1 : 1));
          this.contracts = [...x,...y];
          this.language=''
        }


      });
  }

  openDetails(contract: Contract) {
    this.selectedContract = contract;
    this.canvas.open(this.canvasDetails);
  }

  reject(id: number) {
    this.contractService
      .updateStatus(id, ContractStatus.rejectedByTakid)
      .subscribe(() => this.getContracts());
  }

  clear(){

    this.getContracts();
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
   // this.contracts=this.contracts.filter((ele)=>ele.contractType.value == item);
    this.item=item;
    console.log((this.item));
    
    this.getContracts();
  }
}
