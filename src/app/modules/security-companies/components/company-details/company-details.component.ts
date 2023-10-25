import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { Company } from '../../models/company';
import { COMPANY_DETAILS_LIST } from '../../routes/security-companies-routes.enum';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent implements OnInit {
  startDate!:Date
  endDate!:Date
  package!:any
  navbarLinks = [...COMPANY_DETAILS_LIST];
  data!: Company;
  isAr!: Observable<boolean>;
  constructor(private route: ActivatedRoute, public lang: LangService,  private companiesService: CompaniesService,) {
    this.isAr = this.lang.isAr;
    console.log(this.isAr);
    
  }

  ngOnInit() {
    this.route.data.subscribe((res) => {

      this.data = res['company'];
      console.log(this.data);
      
    
    });
    this. getCompanyPackage();
  }

  
  toggleState(id: number, event: any) {
    if (event.checked) {
      this.companiesService.active(id);
    } else {
      this.companiesService.deActive(id);
    }
  }
  getCompanyPackage(){
    this.companiesService.CompanyValidEnrollment(this.data.id).subscribe((res)=>{
      if(res){
      this.package=res;
      console.log(this.package);
      console.log(this.package.start);
     let datyStart =this.package.start.split(" ")[0]
       const [day, month, year] = datyStart.split("-");
       this.startDate = new Date(+year, +month - 1, +day);
      let datyEnd=this.package.end.split(" ")[0]
      const [da, mont, yea] = datyEnd.split("-");
       this.endDate = new Date(+year, +month - 1, +day);
      }
    })
  }
}
