import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Company } from '../../models/company';
import { RejectModel } from '../../models/reject-model';
import { CompaniesService } from '../../services/companies.service';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-join-requests',
  templateUrl: './join-requests.component.html',
  styleUrls: ['./join-requests.component.scss'],
})
export class JoinRequestsComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  requests!: Company[];
  selectedCompany!: Company;
  active :string ='';
  language : string ='';
  canvasID = 'company_details';
  modalID = 'company_delete_confirm';
  refuseForm = new FormGroup({
    reason: new FormControl(null, [Validators.required]),
  });

  searchKey = '';

  constructor(
    public modalService: ModalService,
    private canvasServices: OffcanvasService,
    private route: ActivatedRoute,
    private requestsServices: RequestsService,
    private auth: AuthService,
    public lang: LangService,
    private companiesServices: CompaniesService
  ) {}

  get reason(): any {
    return this.refuseForm.get('reason');
  }

  ngOnInit() {
    this.getData();
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onPageChange(page: number) {
    this.pageNumber = page;
  }

  getCompanies() {
    this.companiesServices
      .getAllWaitingApproved(this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.requests=response.data;
        if (this.active == '') {
          this.requests;
        } else if (this.active == 'active') {
          let all = this.requests.filter((element: Company) => {
            return element.isActive;
          });
          this.requests = all;
        } else {
          let all = this.requests.filter((element: Company) => {
            return !element.isActive;
       
      });
      this.requests = all;
          console.log(this.requests);
        }
        if (this.language == 'english') {
          var x = [];
          var y = [];

          const regex = /^[A-Z a-z]/;
          for (let i = 0; i < this.requests.length; i++) {
            if (this.requests[i].name.match(regex)) {
              x.push(this.requests[i]);
            } else {
              y.push(this.requests[i]);
            }
          }
          this.requests = [...x.sort(), ...y.sort()];
          x.sort((a, b) => (a.name < b.name ? -1 : 1));
          y.sort((a, b) => (a.name < b.name ? -1 : 1));
          this.requests = [...x, ...y];
        } else {
          var x = [];
          var y = [];

          const regex = /^[ء-ي]/;
          for (let i = 0; i < this.requests.length; i++) {
            if (this.requests[i].name.match(regex)) {
              x.push(this.requests[i]);
            } else {
              y.push(this.requests[i]);
            }
          }
          this.requests = [...x.sort(), ...y.sort()];
          x.sort((a, b) => (a.name < b.name ? -1 : 1));
          y.sort((a, b) => (a.name < b.name ? -1 : 1));
          this.requests = [...x, ...y];
        }
      });

  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openCanvas(id: string) {
    this.canvasServices.open(id);
  }

  closeCanvas(id: string) {
    this.canvasServices.close(id);
  }

  getData() {
    let data: { requests: Pagination<Company> } = this.route.snapshot
      .data as any;

    if (data?.requests) {
      this.requests = data.requests.data;
      this.total = data.requests.totalCount;
    }

    this.requestsServices.updates.subscribe((res) => {
      this.requests = res.data;
      this.total = res.totalCount;
    });
  }

  details(company: Company) {
    this.selectedCompany = company;
    this.canvasServices.open(this.canvasID);
  }

  refuse() {
    if (this.refuseForm.invalid) return;
    let model: RejectModel = {
      securityCompanyId: this.selectedCompany.id,
      reason: this.reason.value,
      takidUserId: this.auth.snapshot.userInfo?.id!,
    };

    if (model) {
      this.requestsServices.refuse(model);
    }
  }

  approve(id: number) {
    this.requestsServices.approve(id);
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
