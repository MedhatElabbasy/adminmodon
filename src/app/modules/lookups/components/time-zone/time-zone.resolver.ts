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
import { TimeZoneService } from '../../services/time-zone.service';

@Injectable({
  providedIn: 'root',
})
export class TimeZoneResolver implements Resolve<Lookup[]> {
  constructor(private timeZoneServices: TimeZoneService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Lookup[]> {
    return this.timeZoneServices.getAllTimeZones();
  }
}
