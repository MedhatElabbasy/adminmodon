import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CompanyScale } from '../../models/company-scale';
import { CompanyScaleService } from '../../services/company-scale.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyScaleResolver implements Resolve<CompanyScale[]> {
  constructor(private scaleServices: CompanyScaleService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CompanyScale[]> {
    return this.scaleServices.getAllCompanyScales();
  }
}
