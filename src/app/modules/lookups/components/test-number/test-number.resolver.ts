import { Injectable } from '@angular/core';

import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TestNumber } from '../../models/test-number';
import { TestNumberService } from '../../services/test-number.service';

@Injectable({
  providedIn: 'root'
})
export class TestNumberResolver implements Resolve<TestNumber[]> {
  constructor(private numberService:TestNumberService){}
  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<TestNumber[]> {
    return this.numberService.getAllNumbers();
  }
}
