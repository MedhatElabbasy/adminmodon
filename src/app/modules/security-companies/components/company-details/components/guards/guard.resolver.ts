import { CompanySecurityGuard } from './../../../../models/company-security-guard';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CompaniesService } from 'src/app/modules/security-companies/services/companies.service';

@Injectable({
  providedIn: 'root'
})
export class GuardResolver implements Resolve<CompanySecurityGuard[]> {
  constructor(private companyService: CompaniesService) {
    
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CompanySecurityGuard[]> {
    return this.companyService.getAllGuardsOnCompany(route.parent?.params['id']);
  }
}
