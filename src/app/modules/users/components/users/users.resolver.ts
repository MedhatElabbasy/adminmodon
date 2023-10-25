import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { UserData } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<Pagination<UserData>> {
  constructor(private user: UsersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pagination<UserData>> {
    return this.user.getAll(1, 10);
  }
}
