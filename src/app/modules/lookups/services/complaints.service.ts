import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RasdInfraction } from '../models/RasdInfraction';
import { Pagination } from '../../core/models/pagination';

@Injectable({
  providedIn: 'root',
})
export class ComplaintsService {
  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getAll(pageNumber: number, pageSize: number): Observable<RasdInfraction> {
    return this.http.get<RasdInfraction>(
      `${this.url}api/RasdInfraction/GetAll?page=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getDataByCompany(
    pageNumber: number,
    pageSize: number,
    companyId: number
  ): Observable<any> {
    return this.http.get<any>(
      `${this.url}api/RasdInfraction/GetAllByCompany?page=${pageNumber}&pageSize=${pageSize}&companyId=${companyId}`
    );
  }
  getDetails(id: string): Observable<any> {
    return this.http.get(`${this.url}api/RasdInfraction/Get?id=${id}`);
  }
  updateStatus(
    orderId: string,
    optionSetName: string,
    value: number
  ): Observable<any> {
    return this.http.get<any>(
      `${this.url}api/RasdInfraction/UpdateStatusType?orderId=${orderId}&optionSetName=${optionSetName}&value=${value}`
    );
  }

  search(key:string ){
    return this.http.get(this.url+`api/RasdInfraction/GetAllSearch?searchkey=${key}`,{headers:{'loader':'true'}})}

}
