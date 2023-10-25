import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { Pagination } from '../../core/models/pagination';
import { SecurityGuard } from '../models/security-gurad';
import { loader } from '../../core/core.module';
import { Loader } from '../../core/enum/loader.enum';

@Injectable({
  providedIn: 'root'
})
export class SecurityguardService {

  public text =  new BehaviorSubject('');
  private readonly url = environment.apiUrl;
  private _updates = new Subject<Pagination<SecurityGuard>>();
  guards!: Pagination<SecurityGuard>;

  constructor(private http: HttpClient, private auth: AuthService) {}

  public get updates(): Observable<Pagination<SecurityGuard>> {
    console.log(this.guards);
    
    return this._updates.asObservable();
  }


  GetAll(
    page: number,
    pageNumber: number
  ): Observable<Pagination<SecurityGuard>> {
    return this.http
      .get<Pagination<SecurityGuard>>(
        this.url +
          `api/SecurityGuard/GetAllGuards?page=${page}&pageSize=${pageNumber}` ,{headers:
            {'loader':'true'}}
      )
      .pipe(
        tap((response) => {
          this.guards = response;
          // console.log(this.guards);
          
          this._updates.next(this.guards);
        })
      );
  }

  delete(id: any): Observable<any> {
    return this.http.get(this.url + `api/SecurityGuard/Delete?Id=${id}`);
  }

  search(
    searchKey:string,
    page: number
  ): Observable<Pagination<SecurityGuard>> {
    return this.http
      .get<Pagination<SecurityGuard>>(
        this.url +
          `api/SecurityGuard/GetAllGuardsSearch?searchKey=${searchKey}&page=${page}&pageSize=10` ,{headers:
            {'loader':'true'}}
      )
          }


          deleteID(id:number){
            return this.http.post(this.url + `api/SecurityGuard/DeleteDeviceId?id=${id}`, null)
          }
}
