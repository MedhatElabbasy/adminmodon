import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Nationality } from '../../models/Nationality';
import { NationalityService } from '../../services/nationality.service';

@Injectable({
  providedIn: 'root'
})
export class NationalityResolver implements Resolve<Nationality[]> {
  constructor( private nationality:NationalityService){}
  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Nationality[]> {
    return this.nationality.getAllnationalities();
  }
}
