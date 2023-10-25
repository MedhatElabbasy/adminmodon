import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Gender } from '../../models/gender';
import { GenderService } from '../../services/gender.service';

@Injectable({
  providedIn: 'root'
})
export class GenderResolver implements Resolve<Gender[]> {
  constructor(private genderservice:GenderService){}
  resolve(route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<Gender[]> {
    return this.genderservice.getAllgenders();
  }
}
