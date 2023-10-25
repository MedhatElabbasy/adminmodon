import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { staticPages } from '../../models/static-pages';
import { OptionsetService } from '../../services/optionset.service';
import { StaticpagesService } from '../../services/staticpages.service';

@Injectable({
  providedIn: 'root'
})
export class StaticpagesResolver implements Resolve<Pagination<staticPages>|any> {
  constructor(private pagesServices:StaticpagesService,
    private optionSetServices:OptionsetService){}
  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<Pagination<staticPages>|any> {

      let optionSets=this.optionSetServices.getAllOptionSets();
      let pages =this.pagesServices.getAllPages(1,10);
      return combineLatest([optionSets, pages]).pipe(
        map((res) => ({ pages: res[1], optionsets: res[0] }))
      );
  }
}
