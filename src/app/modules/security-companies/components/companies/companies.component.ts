import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { Routing } from 'src/app/modules/core/routes/app-routes';
import { CryptoService } from 'src/app/modules/core/services/crypto.service';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Company } from '../../models/company';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  pageNumber = 1;
  pageSize = 5;
  total!: number;
  sizes = [5, 10, 20, 30];
  companies!: Company[];
  canvasID = 'approved_company_details';
  selectedCompany!: Company;
  searchKey = '';
  active: string = '';
  language: string = '';
  typingTimer!: any;                //timer identifier
  doneTypingInterval = 500;
  key=""
  constructor(
    private route: ActivatedRoute,
    private companiesService: CompaniesService,
    public lang: LangService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCompanies();
  }

  // getData() {
  //   let data: Pagination<Company> = this.route.snapshot.data['companies'];
  //   this.companies = data.data;
  //   this.total = data.totalCount;

  //   this.companiesService.updates.subscribe((res) => {
  //     this.companies = res.data;
  //     this.total = data.totalCount;
  //   });
  // }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    console.log(this.pageSize);
    this.getAll();
  }

  onPageChange(event: number) {
    this.pageNumber = event;
    console.log(this.pageNumber);
    this.getAll();
  }

  getAll(){
    console.log("true");
    
    if(this.key==""){
      if(this.active == 'active'){ 
        this.getAllApprovedWithActive()
      }else if(this.active== 'deactive'){
       this.getAllApprovedWithNonActive();
      }else if(this.language=="english"){
      
      this.GetAllOrderBy(false);
      }else if(this.language=="arabic"){
        this.GetAllOrderBy(true);
    }else{
        this.getCompanies();
      }
      
    }else if(this.key!=""){
      this.doneTyping(this.key)
    }
  }

  openDetails(company: Company) {
    this.router.navigate([
      `/${Routing.companies.module}/${Routing.companies.children.companyDetails}`,
      company.id,
    ]);
  }

  getCompanies() {
    this.companiesService
      .getApproved(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.companies = res.data;
        console.log(this.companies);
        
        this.total = res.totalCount;
       
        // if (this.language == 'english') {
        //   var x = [];
        //   var y = [];

        //   const regex = /^[A-Z a-z]/;
        //   for (let i = 0; i < this.companies.length; i++) {
        //     if (this.companies[i].name.match(regex)) {
        //       x.push(this.companies[i]);
        //     } else {
        //       y.push(this.companies[i]);
        //     }
        //   }
        //   this.companies = [...x.sort(), ...y.sort()];
        //   x.sort((a, b) => (a.name < b.name ? -1 : 1));
        //   y.sort((a, b) => (a.name < b.name ? -1 : 1));
        //   this.companies = [...x, ...y];
        // } else if(this.language == 'arabic'){
        //   var x = [];
        //   var y = [];

        //   const regex = /^[ء-ي]/;
        //   for (let i = 0; i < this.companies.length; i++) {
        //     if (this.companies[i].name.match(regex)) {
        //       x.push(this.companies[i]);
        //     } else {
        //       y.push(this.companies[i]);
        //     }
        //   }
        //   this.companies = [...x.sort(), ...y.sort()];
        //   x.sort((a, b) => (a.name < b.name ? -1 : 1));
        //   y.sort((a, b) => (a.name < b.name ? -1 : 1));
        //   this.companies = [...x, ...y];
        // }else{
        //   this.companies;
        // }
      });
  }

  toggleState(id: number, event: any) {
    if (event.checked) {
      this.companiesService.active(id);
    } else {
      this.companiesService.deActive(id);
    }
  }
  getAllApprovedWithActive(){
    this.companiesService.getAllApprovedWithActive(this.pageNumber, this.pageSize).subscribe((res)=>{
      console.log(res);
      this.companies =res.data
      this.total = res.totalCount;
     })
  }

  getAllApprovedWithNonActive(){
    this.companiesService.getAllApprovedWithNonActive(this.pageNumber, this.pageSize).subscribe((res)=>{
      console.log(res);
      this.companies =res.data
      this.total = res.totalCount;
     })
  }

  GetAllOrderBy(AToZ:boolean){
    this.companiesService.GetAllOrderBy(this.pageNumber, this.pageSize , AToZ).subscribe((res:any)=>{
      console.log(res);
      this.companies =res.data
      this.total = res.totalCount;
    })
  }

  filterActive() {
    this.active = 'active';
   this.getAllApprovedWithActive();
  }
  filterDeActive() {
    this.active = 'deactive';
    this.getAllApprovedWithNonActive();
  }
  english() {
    this.language = 'english';
    this.GetAllOrderBy(false)
  }
  arabic() {
    this.language = 'arabic';
    this.GetAllOrderBy(true);
  }
  clear() {
    this.language=""
    this.active=""
    this.getCompanies();
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
      this.getCompanies();
    }else{
      this.companiesService.search(this.key , this.pageNumber , this.pageSize).subscribe((res:any)=>{
        console.log(res);
        this.companies=res.data;
        this.total=res.totalCount;
        console.log(this.total);

        })
    }
  }
}
