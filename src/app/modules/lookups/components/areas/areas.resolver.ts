import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Area } from '../../models/Area';
import { City } from '../../models/city';
import { AreaService } from '../../services/area.service';
import { CityService } from '../../services/city.service';

@Injectable({
  providedIn: 'root',
})
export class AreasResolver
  implements Resolve<{ cities: City[]; areas: Area[] }>
{
  constructor(private Areas: AreaService, private cities: CityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ cities: City[]; areas: Area[] }> {
    let cities = this.cities.getAllCities();
    let area = this.Areas.getAllAreas();
    return combineLatest([cities, area]).pipe(
      map((res) => ({ cities: res[0], areas: res[1] }))
    );
  }
}
