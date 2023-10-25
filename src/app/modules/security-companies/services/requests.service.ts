import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { Pagination } from '../../core/models/pagination';
import { Company } from '../models/company';
import { RejectModel } from '../models/reject-model';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private readonly url = environment.apiUrl;
  private _updates = new Subject<Pagination<Company>>();
  companies!: Pagination<Company>;

  constructor(private http: HttpClient, private auth: AuthService) {}

  public get updates(): Observable<Pagination<Company>> {
    return this._updates.asObservable();
  }

  getAllWaitingApproved(
    page: number,
    pageNumber: number
  ): Observable<Pagination<Company>> {
    return this.http
      .get<Pagination<Company>>(
        this.url +
          `api/SecurityCompany/GetAllWatingApproved?page=${page}&pageSize=${pageNumber}`
      )
      .pipe(
        tap((response) => {
          this.companies = response;
          this._updates.next(this.companies);
        })
      );
  }

  getAllRejected(page: number, pageNumber: number) {
    return this.http
      .get<Pagination<Company>>(
        this.url +
          `api/SecurityCompany/GetAllRejected?page=${page}&pageSize=${pageNumber}`
      )
      .pipe(
        tap((response) => {
          this.companies = response;
          this._updates.next(this.companies);
        })
      );
  }

  refuse(model: RejectModel) {
    this.http
      .post<Pagination<Company>>(this.url + `api/SecurityCompany/Reject`, model)
      .subscribe((response) => {
        if (response) {
          let res = this.companies.data.filter(
            (e) => e.id != model.securityCompanyId
          );
          this.companies.data = res;
          this._updates.next(this.companies);
        }
      });
  }

  approve(id: number) {
    this.http
      .post<boolean>(this.url + `api/SecurityCompany/Approve?id=${id}`, null)
      .subscribe((response) => {
        if (response) {
          let res = this.companies.data.filter((e) => e.id != id);
          this.companies.data = res;
          this._updates.next(this.companies);
        }
      });
  }
}
