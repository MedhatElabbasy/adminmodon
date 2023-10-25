import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Country } from '../../lookups/models/country';
import { LookupsService } from '../services/lookups.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesCodesResolver implements Resolve<Country[]> {
  constructor(private lookupsService: LookupsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Country[]> {
    return this.lookupsService.getCountriesCodes();
  }
}
