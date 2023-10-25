import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Jobtype } from '../../models/jobtype';
import { JobtypeService } from '../../services/jobtype.service';

@Injectable({
  providedIn: 'root'
})
export class JobTypeResolver implements Resolve<Jobtype[]> {
  constructor(private jobtypeservice:JobtypeService){}
  resolve
  (route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Jobtype[]> {
    return this.jobtypeservice.getAlljobtypes();
  }
}
