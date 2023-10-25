import { Component, Input, OnInit } from '@angular/core';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss'],
})
export class CompanyOverviewComponent implements OnInit {
  @Input('company') company!: Company;
  constructor(public lang: LangService) {}

  ngOnInit() {}
}
