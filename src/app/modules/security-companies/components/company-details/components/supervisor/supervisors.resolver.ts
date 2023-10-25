import { CompanySecurityGuard } from './../../../../models/company-security-guard';
import { CompaniesService } from './../../../../services/companies.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupervisorsResolver implements Resolve<CompanySecurityGuard[]> {
  constructor(private companyService: CompaniesService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CompanySecurityGuard[]> {
    return this.companyService.getAllSupervisorsOnCompany(route.parent?.params['id']);
  }
}
