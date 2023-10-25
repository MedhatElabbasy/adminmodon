import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Company } from '../../models/company';
import { CompaniesService } from '../../services/companies.service';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-rejected-companies',
  templateUrl: './rejected-companies.component.html',
  styleUrls: ['./rejected-companies.component.scss'],
})
export class RejectedCompaniesComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  companies!: Company[];
  canvasID = 'rejected_company_details';
  selectedCompany!: Company;
  searchKey = '';
  active : string ='';
  language : string ='';

  constructor(
    private canvasServices: OffcanvasService,
    private route: ActivatedRoute,
    private companiesService: RequestsService,
    public lang: LangService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    let data: Pagination<Company> = this.route.snapshot.data['companies'];
    this.companies = data.data;
    this.total = data.totalCount;

    this.companiesService.updates.subscribe((res) => {
      this.companies = res.data;
      this.total = data.totalCount;
    });
  }

  openDetails(company: Company) {
    this.selectedCompany = company;
    this.canvasServices.open(this.canvasID);
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getCompanies();
  }

  onPageChange(event: number) {
    this.pageNumber = event;

    this.getCompanies();
  }

  getCompanies() {
    this.companiesService
      .getAllRejected(this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.companies=response.data;
        if (this.active == '') {
          this.companies;
        } else if (this.active == 'active') {
          let all = this.companies.filter((element: Company) => {
            return element.isActive;
          });
          this.companies = all;
        } else {
          let all = this.companies.filter((element: Company) => {
            return !element.isActive;
       
      });
      this.companies = all;
          console.log(this.companies);
        }
        if (this.language == 'english') {
          var x = [];
          var y = [];

          const regex = /^[A-Z a-z]/;
          for (let i = 0; i < this.companies.length; i++) {
            if (this.companies[i].name.match(regex)) {
              x.push(this.companies[i]);
            } else {
              y.push(this.companies[i]);
            }
          }
          this.companies = [...x.sort(), ...y.sort()];
          x.sort((a, b) => (a.name < b.name ? -1 : 1));
          y.sort((a, b) => (a.name < b.name ? -1 : 1));
          this.companies = [...x, ...y];
        } else {
          var x = [];
          var y = [];

          const regex = /^[ء-ي]/;
          for (let i = 0; i < this.companies.length; i++) {
            if (this.companies[i].name.match(regex)) {
              x.push(this.companies[i]);
            } else {
              y.push(this.companies[i]);
            }
          }
          this.companies = [...x.sort(), ...y.sort()];
          x.sort((a, b) => (a.name < b.name ? -1 : 1));
          y.sort((a, b) => (a.name < b.name ? -1 : 1));
          this.companies = [...x, ...y];
        }
      });

  }

  approve(id: number) {
    this.companiesService.approve(id);
  }

  

  filterActive() {
    this.active = 'active';
    this.getCompanies();
  }
  filterDeActive() {
    this.active = 'deactive';
    this.getCompanies();
  }
  english() {
    this.language = 'english';
    this.getCompanies();
  }
  arabic() {
    this.language = 'arabic';
    this.getCompanies();
  }
}
