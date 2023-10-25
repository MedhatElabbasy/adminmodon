import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientSite } from 'src/app/modules/accident/models/accident';
import { CompaniesService } from 'src/app/modules/security-companies/services/companies.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
id!:any;
sites!:ClientSite[]
  constructor(private company:CompaniesService , private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getData()
  }

getData(){
  this.id=this.route.parent?.snapshot.params['id']
  this.company.getAllClientSites(this.id).subscribe((res:any)=>{
    this.sites=res;
    console.log(this.sites);
    
  })
}
}
