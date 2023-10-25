import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject ,tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../../core/models/pagination';
import { Settings } from '../models/setting';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly url = environment.apiUrl;
  private _updates = new Subject<Pagination<Settings>>();
  settings!: Pagination<Settings>;

constructor(private http: HttpClient) { }

public get updates(): Observable<Pagination<Settings>> {
  return this._updates.asObservable();
}


getAllSettings(
  page: number,
  pageSize: number
): Observable<Pagination<Settings>> {
  return this.http
    .get<Pagination<Settings>>(
      this.url +
        `api/Settings/GetAll?page=${page}&pageSize=${pageSize}`
    )
    .pipe(
      tap((response) => {
        this.settings = response;
        this._updates.next(this.settings);
      })
    );
}

createSetting(model: Settings) {
  this.http
    .post<Settings>(this.url + `api/Settings/Create`, model)
    .subscribe((response) => {
      this.settings.data.push(response);
      this._updates.next(this.settings);
    });
}

update(model: Settings) {
  this.http
    .post<Settings>(this.url + `api/Settings/Update`, model)
    .subscribe((response) => {
      const index = this.settings.data.findIndex((e) => e.id == response.id);
      this.settings[index] = response;
      this._updates.next(this.settings);
    });
}


delete(id: any) {
  this.http
    .post<Settings>(this.url + `api/Settings/Delete?id=${id}`, null)
    .subscribe((response) => {
      if (response) {
        let res = this.settings.data.filter((e) => e.id != id);
        this.settings.data = [...res];
        this._updates.next(this.settings);
      }
    });
}


search(key:string , pageNumber: number, pageSize: number){
  return this.http.get(this.url+`api/Settings/GetAllSearch?SearchKey=${key}&page=${pageNumber}&pageSize=${pageSize}`,{headers:
    {'loader':'true'}})
}

}
