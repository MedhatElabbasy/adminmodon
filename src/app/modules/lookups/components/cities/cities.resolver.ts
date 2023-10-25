import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { combineLatest, map, Observable, of } from 'rxjs';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';
import { CountriesService } from '../../services/countries.service';

@Injectable({
  providedIn: 'root',
})
export class CitiesResolver implements Resolve<City[] | any> {
  constructor(
    private cities: CityService,
    private countries: CountriesService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<City[] | any> {
    let countries = this.countries.getAllCountries();
    let cities = this.cities.getAllCities();
    return combineLatest([countries, cities]).pipe(
      map((res) => ({ cities: res[1], countries: res[0] }))
    );
  }
}
