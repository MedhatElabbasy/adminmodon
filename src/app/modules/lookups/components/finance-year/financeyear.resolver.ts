import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Financeyear } from '../../models/financeyear';
import { FinanceYearService } from '../../services/finance-year.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceyearResolver implements Resolve<Financeyear[]> {
  constructor(private financeyear:FinanceYearService) {}

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Financeyear[]> {
    return this.financeyear.getAllfinanceyear();
  }
}
