import { Client } from './../../../../models/client';
import { Pagination } from './../../../../../core/models/pagination';
import { CompaniesService } from 'src/app/modules/security-companies/services/companies.service';
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
export class ClientsResolver implements Resolve<Pagination<Client>> {
 constructor(private companyServices: CompaniesService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pagination<Client>> {
    return this.companyServices.getClientsBySecurityCompany(route.parent?.params['id'],1, 10);;
  }
}
