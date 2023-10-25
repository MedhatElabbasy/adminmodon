import { Pagination } from './../../models/pagination';
import { ClientsCompaniesService } from './../../services/clients-companies.service';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientsCompanies } from '../../models/clients-companies';

@Injectable({
  providedIn: 'root',
})
export class ClientsCompaniesResolver
  implements Resolve<Pagination<ClientsCompanies>>
{
  constructor(private clientsService: ClientsCompaniesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pagination<ClientsCompanies>> {
    return this.clientsService.getALlCompanies(1, 10);
  }
}
