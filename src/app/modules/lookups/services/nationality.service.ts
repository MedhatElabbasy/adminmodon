import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject , tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nationality } from '../models/Nationality';

@Injectable({
  providedIn: 'root'
})
export class NationalityService {
  private readonly url = environment.apiUrl;
  private nationalityUpdate = new Subject<Nationality[]>();
  nationalities!: Nationality[];

  constructor(private http: HttpClient) { }
  get nationalityUpdates(): Observable<Nationality[]> {
    return this.nationalityUpdate.asObservable();
  }

  getAllnationalities() {
    return this.http.get<Nationality[]>(this.url + `api/Nationality/GetAll`).pipe(
      tap((response) => {

        this.nationalities = response;
        this.nationalityUpdate.next([...response]);
      })
    );
  }

  add(model: Nationality) {
    this.http
      .post<Nationality>(this.url + `api/Nationality/Add`, model)
      .subscribe((response) => {
        model.id = response.id;
        this.nationalities.push(model);
        this.nationalityUpdate.next([...this.nationalities]);
      });
  }

  update(model: Nationality) {
    this.http
      .post<Nationality>(this.url + `api/Nationality/Update`, model)
      .subscribe((response) => {
        const index = this.nationalities.findIndex((e) => e.id == response.id);
        this.nationalities[index] = response;
        this.nationalityUpdate.next([...this.nationalities]);
      });
  }

  delete(id: any) {
    this.http
      .post<Nationality>(this.url + `api/Nationality/Delete?id=${id}`, null)
      .subscribe((response) => {
        if (response) {
          let res = this.nationalities.filter((e) => e.id != id);
          this.nationalities = [...res];
          this.nationalityUpdate.next([...this.nationalities]);
        }
      });
  }

}
