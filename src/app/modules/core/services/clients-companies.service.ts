import { Pagination } from './../models/pagination';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClientsCompanies } from '../models/clients-companies';

@Injectable({
  providedIn: 'root',
})
export class ClientsCompaniesService {
  private readonly url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getALlCompanies(pageNumber: number, pageSize: number) {
    return this.http.get<Pagination<ClientsCompanies>>(
      this.url +
        `api/ClientCompany/GetAllClientCompany?page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getALlActiveCompanies(pageNumber: number, pageSize: number) {
    return this.http.get<Pagination<ClientsCompanies>>(
      this.url +
        `api/ClientCompany/GetAllActive?page=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getALlNotActiveCompanies(pageNumber: number, pageSize: number) {
    return this.http.get<Pagination<ClientsCompanies>>(
      this.url +
        `api/ClientCompany/GetAllNonActive?page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  active(id: number) {
    return this.http
      .post(this.url + `api/ClientCompany/Active?id=${id}`, null)
      .subscribe((res) => {
        console.log(res);
      });
  }

  deactive(id: number) {
    return this.http
      .post(this.url + `api/ClientCompany/DeActive?id=${id}`, null)
      .subscribe((res) => {
        console.log(res);
      });
  }

  search(key: string, pageNumber: number, pageSize: number) {
    return this.http.get(
      this.url +
        `api/ClientCompany/GetAllClientCompanySerach?serarchkey=${key}&page=${pageNumber}&pageSize=${pageSize}`,
      { headers: { loader: 'true' } }
    );
  }
}
