import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { Contract } from '../../models/contract';
import { ContractsService } from '../../services/contracts.service';

@Injectable({
  providedIn: 'root',
})
export class AllContractsResolver implements Resolve<Pagination<Contract>> {
  constructor(private contracts: ContractsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pagination<Contract>> {
    return this.contracts.getAll(1, 10);
  }
}
