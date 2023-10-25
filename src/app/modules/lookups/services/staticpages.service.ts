import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../../core/models/pagination';
import { staticPages} from '../models/static-pages';

@Injectable({
  providedIn: 'root'
})
export class StaticpagesService {
  private readonly url = environment.apiUrl;
  private _updates = new Subject<Pagination<staticPages>>();
  staticPages!: Pagination<staticPages>;

  constructor(private http: HttpClient) { }
  public get updates(): Observable<Pagination<staticPages>> {
    return this._updates.asObservable();
  }
  getAllPages(
    page: number,
    pageSize: number
  ): Observable<Pagination<staticPages>> {
    return this.http
      .get<Pagination<staticPages>>(
        this.url +
          `api/StaticPages/GetAll?page=${page}&pageSize=${pageSize}`
      )
      .pipe(
        tap((response) => {
          this.staticPages = response;
          this._updates.next(this.staticPages);
        })
      );
  }

  createPage(model: staticPages) {
    this.http
      .post<staticPages>(this.url + `api/StaticPages/Create`, model)
      .subscribe((response) => {
        this.staticPages.data.push(response);
        this._updates.next(this.staticPages);
      });
  }

  update(model: staticPages) {
    this.http
      .post<staticPages>(this.url + `api/StaticPages/Update`, model)
      .subscribe((response) => {
        const index = this.staticPages.data.findIndex((e) => e.pageTypeId == response.pageTypeId);
        this.staticPages[index] = response;
        this._updates.next(this.staticPages);
      });
  }


  delete(id: any) {
    this.http
      .post<staticPages>(this.url + `api/StaticPages/Delete?id=${id}`, null)
      .subscribe((response) => {
        if (response) {
          let res = this.staticPages.data.filter((e) => e.id != id);
          this.staticPages.data = [...res];
          this._updates.next(this.staticPages);
        }
      });
  }

  getPageByName(name:any){
    this.http.get<staticPages>(this.url+`api/StaticPages/GetByName?name=${name}`)
    .subscribe((res)=>{
      if(res){
        let response=this.staticPages.data.filter((e)=>e.name==name);
        this.staticPages.data=[...response];
        this._updates.next(this.staticPages)
      }
    })

  }

}
