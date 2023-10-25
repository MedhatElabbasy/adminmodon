import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Lookup } from '../../models/lookup';
import { ShiftService } from '../../services/shift.service';

@Injectable({
  providedIn: 'root',
})
export class ShiftResolver implements Resolve<Lookup[]> {
  constructor(private shiftService: ShiftService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Lookup[]> {
    return this.shiftService.getAllCompanyTypes();
  }
}
