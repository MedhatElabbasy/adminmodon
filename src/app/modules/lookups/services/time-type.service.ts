import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lookup } from '../models/lookup';

@Injectable({
  providedIn: 'root',
})
export class TimeTypeService {
  private readonly url = environment.apiUrl;
  lookups!: Lookup[];
  private lookupsUpdates = new Subject<Lookup[]>();
  constructor(private http: HttpClient) {}

  get updates() {
    return this.lookupsUpdates.asObservable();
  }

  getAllTimeType() {
    return this.http.get<Lookup[]>(this.url + `api/TimeType/GetAll`).pipe(
      tap((res) => {
        this.lookups = [...res];
        this.lookupsUpdates.next([...this.lookups]);
      })
    );
  }

  add(model: Lookup) {
    this.http
      .post<Lookup>(this.url + `api/TimeType/Add`, model)
      .subscribe((response) => {
        model.id = response.id;
        this.lookups.push(model);
        this.lookupsUpdates.next([...this.lookups]);
      });
  }

  update(model: Lookup) {
    this.http
      .post<Lookup>(this.url + `api/TimeType/Update`, model)
      .subscribe((response) => {
        const index = this.lookups.findIndex((e) => e.id == response.id);
        this.lookups[index] = response;
        this.lookupsUpdates.next([...this.lookups]);
      });
  }

  delete(id: any) {
    this.http
      .post<Lookup>(this.url + `api/TimeType/Delete?id=${id}`, null)
      .subscribe((response) => {
        if (response) {
          if (response) {
            let res = this.lookups.filter((e) => e.id != id);
            this.lookups = [...res];
            this.lookupsUpdates.next([...this.lookups]);
          }
        }
      });
  }
}
