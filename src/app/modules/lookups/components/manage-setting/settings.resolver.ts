import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { Settings } from '../../models/setting';
import { SettingsService } from '../../services/settings.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsResolver implements Resolve<Pagination<Settings>> {

  constructor(private settingsServices:SettingsService){}
  resolve(route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot):
      Observable<Pagination<Settings>> {
    return this.settingsServices.getAllSettings(1,10);
  }
}
