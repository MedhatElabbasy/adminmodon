import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContractStatus, OptionSet } from '../../core/enum/status.enum';
import { Pagination } from '../../core/models/pagination';
import { Contract } from '../models/contract';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(pageNumber: number, pageSize: number) {
    return this.http.get<Pagination<Contract>>(
      this.url +
        `api/ClientSecurityContract/GetAll?page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  updateStatus(id: number, value: number) {
    return this.http.get(
      this.url +
        `api/ClientSecurityContract/UpdateOrderStatusType?contractId=${id}&optionSetName=${OptionSet.ContractStatus}&value=${value}`
    );
  }

  updateRejectedReason(id: number, value: number ,reason:string) {
    return this.http.get(
      this.url +
        `api/ClientSecurityContract/UpdateContractStatusTakid?contractId=${id}&optionSetName=${OptionSet.ContractStatus}&value=${value}&RejectReson=${reason}`
    
    )
  }

  getAcceptedContracts(pageNumber: number, pageSize: number) {
    return this.http.get<Pagination<Contract>>(
      this.url +
        `api/ClientSecurityContract/GetAllByStatus?page=${pageNumber}&pageSize=${pageSize}&OptionSetName=${OptionSet.ContractStatus}&value=${ContractStatus.acceptedByTakid}`
    );
  }

  getRejectedContracts(pageNumber: number, pageSize: number) {
    return this.http.get<Pagination<Contract>>(
      this.url +
        `api/ClientSecurityContract/GetAllByStatus?page=${pageNumber}&pageSize=${pageSize}&OptionSetName=${OptionSet.ContractStatus}&value=${ContractStatus.rejectedByTakid}`
    );
  }

  getContractType(): Observable<any>{
    return this.http.get(this.url+`api/OptionSet/GetByName?name=contracttype`);
  }


  search(key:string , pageNumber: number,pageSize: number){
    return this.http.get(this.url+`api/ClientSecurityContract/GetAllSearch?SerachKey=${key}&page=${pageNumber}&pageSize=${pageSize}`,{headers:
      {'loader':'true'}})
  }

  isOldContract(id: string) {
    return this.http.get(
      this.url +
        `api/ClientSecurityContract/GetSecurityCompanyContract?contractId=${id}`
    );
  }

   getByContractType(pageNumber: number, pageSize: number ,value:number) {
    return this.http.get<Pagination<Contract>>(
      this.url +
        `api/ClientSecurityContract/GetAllByContractType?page=${pageNumber}&pageSize=${pageSize}&OptionSetName=${OptionSet.ContractType}&value=${value}`
    );
  }


}
