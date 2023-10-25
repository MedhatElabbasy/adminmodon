import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Financeyear } from '../models/financeyear';

@Injectable({
  providedIn: 'root'
})
export class FinanceYearService {
  private readonly url = environment.apiUrl;
  private financeyearUpdate = new Subject<Financeyear[]>();
  bloodtypes!: Financeyear[];

  constructor(private http: HttpClient) { }

  get financeyearUpdates(): Observable<Financeyear[]> {
    return this.financeyearUpdate.asObservable();
  }


  getAllfinanceyear() {
    return this.http.get<Financeyear[]>(this.url + `api/FinanceYear/GetAll`).pipe(
      tap((response) => {

        this.bloodtypes = response;
        this.financeyearUpdate.next([...response]);
      })
    );
  }

  add(model: Financeyear) {
    this.http
      .post<Financeyear>(this.url + `api/FinanceYear/Add`, model)
      .subscribe((response) => {
        model.id = response.id;
        this.bloodtypes.push(model);
        this.financeyearUpdate.next([...this.bloodtypes]);
      });
  }

  update(model: Financeyear) {
    this.http
      .post<Financeyear>(this.url + `api/FinanceYear/Update`, model)
      .subscribe((response) => {
        const index = this.bloodtypes.findIndex((e) => e.id == response.id);
        this.bloodtypes[index] = response;
        this.financeyearUpdate.next([...this.bloodtypes]);
      });
  }

  delete(id: any) {
    this.http
      .post<Financeyear>(this.url + `api/FinanceYear/Delete?id=${id}`, null)
      .subscribe((response) => {
        if (response) {
          let res = this.bloodtypes.filter((e) => e.id != id);
          this.bloodtypes = [...res];
          this.financeyearUpdate.next([...this.bloodtypes]);
        }
      });
  }
}
