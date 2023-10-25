import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { rasdUser } from './../models/rasdUser';
import { environment } from 'src/environments/environment';
import { Pagination } from '../../core/models/pagination';

@Injectable({
  providedIn: 'root',
})
export class RasdService {
  private readonly url = environment.apiUrl;
  public _updates = new Subject<Pagination<rasdUser>>();
  users!: Pagination<rasdUser>;

  constructor(private http: HttpClient) {}

  getAll(pageNumber: number, pageSize: number): Observable<rasdUser> {
    return this.http.get<rasdUser>(
      `${this.url}api/RasdUser/GetAll?page=${pageNumber}&pageSize=${pageSize}`
    );
  }
  get updates() {
    return this._updates.asObservable();
  }
  active(user: rasdUser) {
    this.http
      .post(this.url + `api/RasdUser/ActiveUser?Id=${user.appUser.id}`, {})
      .subscribe((response) => {
        if (response) {
          const index = this.users.data.findIndex((e) => e.id == user.id);
          this.users.data[index] = user;
          this._updates.next(this.users);
        }
      });
  }

  deActive(user: rasdUser) {
    this.http
      .post(this.url + `api/RasdUser/DeActiveUser?Id=${user.appUser.id}`, {})
      .subscribe((response) => {
        if (response) {
          const index = this.users.data.findIndex((e) => e.id == user.id);
          this.users.data[index] = user;
          this._updates.next(this.users);
        }
      });
  }

  addUser(user: rasdUser, photoLocalUrl: string | null) {
    return this.http
      .post<rasdUser>(this.url + `api/RasdUser/Add`, user)
      // .subscribe((response: any) => {
      //   let user = { ...response, photo: { fullLink: photoLocalUrl } };
      //   this.users.totalCount += 1;
      //   this.users.data.push(user);
      //   this._updates.next(this.users);
      // });
  }
  update(user: rasdUser, photoLocalUrl: string | null) {
    this.http
      .post<rasdUser>(this.url + `api/RasdUser/Update`, user)
      .subscribe((response: any) => {
        let user = { ...response, photo: { fullLink: photoLocalUrl } };
      });
  }
}
