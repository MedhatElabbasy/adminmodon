import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecurityCompany } from 'src/app/modules/contracts/models/contract';
import { ClientsCompanies } from 'src/app/modules/core/models/clients-companies';
import { ClientsCompaniesService } from 'src/app/modules/core/services/clients-companies.service';
import { CLIENT_DETAILS_LIST } from 'src/app/modules/security-companies/routes/security-companies-routes.enum';
import { CompaniesService } from 'src/app/modules/security-companies/services/companies.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
id!:string
clientCompany!:ClientsCompanies
SecurityCompany!:SecurityCompany
navbarLinks = [...CLIENT_DETAILS_LIST];
  constructor( private company :CompaniesService ,  private route: ActivatedRoute, private clientsService : ClientsCompaniesService) { }

  ngOnInit(): void {
    this.getClientData();
  }
getClientData(){
  this.route.params.subscribe((res:any) => {
    this.id = res['id'];
    console.log(this.id);
    localStorage.setItem('clientID', this.id);
    this.company.getClientByClientID(this.id).subscribe((res:any)=>{
      this.clientCompany=res.clientCompany;
      console.log(this.clientCompany);
      this.SecurityCompany=res.securityCompany;
      console.log(res.securityCompany);
      console.log(this.SecurityCompany);
      
    })
})
}


toggleState(id:any, event: any) {
  
  if (event.checked) {
    this.clientsService.active(id);
  } else {
    this.clientsService.deactive(id);
  }
}
}