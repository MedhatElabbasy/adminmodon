import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BloodType } from '../../models/bloodType';
import { BloodTypeService } from '../../services/blood-type.service';

@Injectable({
  providedIn: 'root'
})
export class BloodtypeResolver implements Resolve<BloodType[]> {
  constructor(private bloodtype:BloodTypeService) {}

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<BloodType[]> {
    return this.bloodtype.getAllbloodtypes();
  }
}
