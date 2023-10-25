import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Lookup } from '../../models/lookup';
import { CompanyTypeService } from '../../services/company-type.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyTypeResolver implements Resolve<Lookup[]> {
  constructor(private companyTypeService: CompanyTypeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Lookup[]> {
    return this.companyTypeService.getAllCompanyTypes();
  }
}
