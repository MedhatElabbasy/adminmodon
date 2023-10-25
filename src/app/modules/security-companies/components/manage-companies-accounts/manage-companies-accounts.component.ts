import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Routing } from 'src/app/modules/core/routes/app-routes';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';

@Component({
  selector: 'app-manage-companies-accounts',
  templateUrl: './manage-companies-accounts.component.html',
  styleUrls: ['./manage-companies-accounts.component.scss'],
})
export class ManageCompaniesAccountsComponent implements OnInit {
  links = {
    accounts: `${Routing.companies.children.companies}`,
    requests: `${Routing.companies.children.joinRequests}`,
    rejected: `${Routing.companies.children.rejectedCompanies}`,
  };

  constructor(public route: ActivatedRoute) {}

  ngOnInit() {}
}
