import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Lookup } from '../../models/lookup';
import { BusinessTypeService } from '../../services/business-type.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessTypeResolver implements Resolve<Lookup[]> {
  constructor(private businessTypeService: BusinessTypeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Lookup[]> {
    return this.businessTypeService.getAllBusinessType();
  }
}
