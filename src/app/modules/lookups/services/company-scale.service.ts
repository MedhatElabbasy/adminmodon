import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyScale } from '../models/company-scale';

@Injectable({
  providedIn: 'root',
})
export class CompanyScaleService {
  private readonly url = environment.apiUrl;
  scales!: CompanyScale[];
  private scalesUpdate = new Subject<CompanyScale[]>();

  constructor(private http: HttpClient) {}

  get updates() {
    return this.scalesUpdate.asObservable();
  }

  getAllCompanyScales() {
    return this.http
      .get<CompanyScale[]>(this.url + `api/CompanyScale/GetAll`)
      .pipe(
        tap((response) => {
          this.scales = [...response];
          this.scalesUpdate.next([...this.scales]);
        })
      );
  }

  add(model: CompanyScale) {
    this.http
      .post<CompanyScale>(this.url + `api/CompanyScale/Add`, model)
      .subscribe((response) => {
        model.id = response.id;
        this.scales.push(model);
        this.scalesUpdate.next([...this.scales]);
      });
  }

  update(model: CompanyScale) {
    this.http
      .post<CompanyScale>(this.url + `api/CompanyScale/Update`, model)
      .subscribe((response) => {
        const index = this.scales.findIndex((e) => e.id == response.id);
        this.scales[index] = response;
        this.scalesUpdate.next([...this.scales]);
      });
  }

  delete(id: any) {
    this.http
      .post<CompanyScale>(this.url + `api/CompanyScale/Delete?id=${id}`, null)
      .subscribe((response) => {
        let res = this.scales.filter((e) => e.id != id);
        this.scales = [...res];
        this.scalesUpdate.next([...this.scales]);
      });
  }
}
