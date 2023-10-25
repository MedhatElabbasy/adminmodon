import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../../auth/models/user-info';
import { Pagination } from '../../core/models/pagination';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly url = environment.apiUrl;
  public _updates = new Subject<Pagination<any>>();
  users!: Pagination<UserInfo>;

  constructor(private http: HttpClient) {}

  get updates() {
    return this._updates.asObservable();
  }

  getAll(
    pageNumber: number,
    pageSize: number
  ): Observable<Pagination<UserInfo>> {
    return this.http
      .get<Pagination<UserInfo>>(
        this.url +
          `api/TakidAdmin/GetAll?page=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(
        tap((response) => {
          this.users = response;
          this._updates.next(response);
        })
      );
  }

  getAllActive(
    pageNumber: number,
    pageSize: number
  ): Observable<Pagination<UserInfo>> {
    return this.http
      .get<Pagination<UserInfo>>(
        this.url +
          `api/TakidAdmin/GetAllActive?page=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(
        tap((response) => {
          this.users = response;
          this._updates.next(response);
        })
      );
  }

  getAllNotActive(
    pageNumber: number,
    pageSize: number
  ): Observable<Pagination<UserInfo>> {
    return this.http
      .get<Pagination<UserInfo>>(
        this.url +
          `api/TakidAdmin/GetAllNotactive?page=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(
        tap((response) => {
          this.users = response;
          this._updates.next(response);
        })
      );
  }

  getAllAdmin(
    pageNumber: number,
    pageSize: number
  ): Observable<Pagination<UserInfo>> {
    return this.http
      .get<Pagination<UserInfo>>(
        this.url +
          `api/TakidAdmin/GetAllAdmin?page=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(
        tap((response) => {
          this.users = response;
          this._updates.next(response);
        })
      );
  }
  getAllSuperAdmin(
    pageNumber: number,
    pageSize: number
  ): Observable<Pagination<UserInfo>> {
    return this.http
      .get<Pagination<UserInfo>>(
        this.url +
          `api/TakidAdmin/GetAllSuberAdmin?page=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(
        tap((response) => {
          this.users = response;
          this._updates.next(response);
        })
      );
  }
  active(user: UserInfo) {
    this.http
      .get(this.url + `api/TakidAdmin/ActiveUser?id=${user.id}`)
      .subscribe((response) => {
        if (response) {
          const index = this.users.data.findIndex((e) => e.id == user.id);
          this.users.data[index] = user;
          this._updates.next(this.users);
        }
      });
  }

  deActive(user: UserInfo) {
    this.http
      .get(this.url + `api/TakidAdmin/DeactivateUser?id=${user.id}`)
      .subscribe((response) => {
        if (response) {
          const index = this.users.data.findIndex((e) => e.id == user.id);
          this.users.data[index] = user;
          this._updates.next(this.users);
        }
      });
  }

  add(model: UserInfo, photoLocalUrl: string | null) {
    return this.http.post(this.url + `api/TakidAdmin/Add`, model);
    // .subscribe((response: any) => {
    //   let user = { ...response, photo: { fullLink: photoLocalUrl } };
    //   this.users.totalCount += 1;
    //   this.users.data.push(user);
    //   this._updates.next(this.users);
    // });
  }
  delete(id: any): Observable<any> {
    return this.http.post(this.url + `api/TakidAdmin/Delete?Id=${id}`, null);
  }

  search(key: string, pageNumber: number, pageSize: number) {
    return this.http.get(
      this.url +
        `api/TakidAdmin/GetAllSearch?searchkey=${key}&page=${pageNumber}&pageSize=${pageSize}`,
      { headers: { loader: 'true' } }
    );
  }
}
