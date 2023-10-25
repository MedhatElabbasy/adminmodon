import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { OptionSet } from '../../models/option-set';
import { OptionsetService } from '../../services/optionset.service';

@Injectable({
  providedIn: 'root'
})
export class OptionsetitemResolver implements Resolve<OptionSet[]> {
  constructor(private optionset:OptionsetService){}
  resolve(route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot):
      Observable<OptionSet[]> {
    return this.optionset.getAllOptionSets();
  }
}
