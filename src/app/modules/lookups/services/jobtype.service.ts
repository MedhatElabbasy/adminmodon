import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Jobtype } from '../models/jobtype';

@Injectable({
  providedIn: 'root',
})
export class JobtypeService {
  private readonly url = environment.apiUrl;
  private jobtypeUpdate = new Subject<Jobtype[]>();
  jobtypes!: Jobtype[];

  constructor(private http: HttpClient) {}
  get jobtypeUpdates(): Observable<Jobtype[]> {
    return this.jobtypeUpdate.asObservable();
  }

  getAlljobtypes() {
    return this.http.get<Jobtype[]>(this.url + `api/JobType/GetAll`).pipe(
      tap((response) => {
        console.log(response);
        this.jobtypes = response;
        this.jobtypeUpdate.next([...response]);
      })
    );
  }

  add(model: Jobtype) {
    this.http
      .post<Jobtype>(this.url + `api/JobType/Add`, model)
      .subscribe((response) => {
        model.id = response.id;
        this.jobtypes.push(model);
        this.jobtypeUpdate.next([...this.jobtypes]);
      });
  }

  update(model: Jobtype) {
    this.http
      .post<Jobtype>(this.url + `api/JobType/Update`, model)
      .subscribe((response) => {
        const index = this.jobtypes.findIndex((e) => e.id == response.id);
        this.jobtypes[index] = response;
        this.jobtypeUpdate.next([...this.jobtypes]);
      });
  }

  delete(id: any) {
    this.http
      .post<Jobtype>(this.url + `api/JobType/Delete?id=${id}`, null)
      .subscribe((response) => {
        if (response) {
          let res = this.jobtypes.filter((e) => e.id != id);
          this.jobtypes = [...res];
          this.jobtypeUpdate.next([...this.jobtypes]);
        }
      });
  }
}
