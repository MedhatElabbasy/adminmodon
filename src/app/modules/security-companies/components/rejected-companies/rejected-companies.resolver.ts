import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { Company } from '../../models/company';
import { RequestsService } from '../../services/requests.service';

@Injectable({
  providedIn: 'root',
})
export class RejectedCompaniesResolver implements Resolve<Pagination<Company>> {
  constructor(private companies: RequestsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pagination<Company>> {
    return this.companies.getAllRejected(1, 10);
  }
}
