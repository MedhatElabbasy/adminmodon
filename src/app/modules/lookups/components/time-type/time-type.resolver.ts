import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Lookup } from '../../models/lookup';
import { TimeTypeService } from '../../services/time-type.service';

@Injectable({
  providedIn: 'root',
})
export class TimeTypeResolver implements Resolve<Lookup[]> {
  constructor(private timeServices: TimeTypeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Lookup[]> {
    return this.timeServices.getAllTimeType();
  }
}
