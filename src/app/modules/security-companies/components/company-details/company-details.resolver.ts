import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Company } from '../../models/company';
import { CompaniesService } from '../../services/companies.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyDetailsResolver implements Resolve<Company> {
  constructor(private company: CompaniesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Company> {
    return this.company.getCompanyById(route.params['id']);
  }
}

