import { ActivatedRoute } from '@angular/router';
import { CryptoService } from 'src/app/modules/core/services/crypto.service';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { Component, OnInit } from '@angular/core';
import { PAGE_SIZES } from 'src/app/modules/core/data/page-sizes';
import { CompanySecurityGuard } from 'src/app/modules/security-companies/models/company-security-guard';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss'],
})
export class SupervisorComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5,10,20,30];
  guards: CompanySecurityGuard[] = [];
  searchKey = '';

  constructor(
    public lang: LangService,
    private route: ActivatedRoute,
 
  ) {}

  ngOnInit(): void {
    this.guards = this.route.snapshot.data['guards'];
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
  }

}
