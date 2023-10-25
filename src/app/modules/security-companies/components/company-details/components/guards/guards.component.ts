import { CompanySecurityGuard } from './../../../../models/company-security-guard';
import { Component, OnInit } from '@angular/core';
import { PAGE_SIZES } from 'src/app/modules/core/data/page-sizes';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/modules/core/services/crypto.service';
import { Routing } from 'src/app/modules/core/routes/app-routes';

@Component({
  selector: 'app-guards',
  templateUrl: './guards.component.html',
  styleUrls: ['./guards.component.scss'],
})
export class GuardsComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [...PAGE_SIZES];
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
