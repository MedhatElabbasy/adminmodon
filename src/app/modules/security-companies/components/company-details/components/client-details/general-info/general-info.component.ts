import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsCompanies } from 'src/app/modules/core/models/clients-companies';
import { CompaniesService } from 'src/app/modules/security-companies/services/companies.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {
id!:any;
clientCompany!:ClientsCompanies
  constructor( private route: ActivatedRoute , private company :CompaniesService) { 
    console.log(this.route.parent?.snapshot.params['id']);
    
this.id=localStorage.getItem('clientID')
    console.log(this.id);
    this.company.getClientByClientID(this.id).subscribe((res:any)=>{
      this.clientCompany=res.clientCompany;})
    
  }

  ngOnInit(): void {
  }
 

}
