import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { convertDateToString } from '../core/core.module';
import { Loader } from '../core/enum/loader.enum';
import { Accident } from './models/accident';
import { ReportsService } from './service/reports.service';

@Injectable({
  providedIn: 'root',
})
export class AccidentResolver implements Resolve<Accident[]> {
  constructor(private reports: ReportsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Accident[]> {
    let startDate = convertDateToString(new Date());
    let endDate = convertDateToString(new Date());
    return this.reports.getAccidentsByDate(
      startDate,
      endDate,
      Loader.yes
    );
  }
}
