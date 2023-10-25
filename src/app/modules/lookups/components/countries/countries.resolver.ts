import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Country } from '../../models/country';
import { CountriesService } from '../../services/countries.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesResolver implements Resolve<Country[]> {
  constructor(private countries: CountriesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Country[]> {
    return this.countries.getAllCountries();
  }
}
