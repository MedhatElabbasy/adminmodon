import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gender } from '../models/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private readonly url = environment.apiUrl;
  private genderUpdate = new Subject<Gender[]>();
  genders!: Gender[];

  constructor(private http: HttpClient) { }
  get genderUpdates(): Observable<Gender[]> {
    return this.genderUpdate.asObservable();
  }

  getAllgenders() {
    return this.http.get<Gender[]>(this.url + `api/Gender/GetAll`).pipe(
      tap((response) => {

        this.genders = response;
        this.genderUpdate.next([...response]);
      })
    );
  }
  add(model: Gender) {
    this.http
      .post<Gender>(this.url + `api/Gender/Add`, model)
      .subscribe((response) => {
        model.id = response.id;
        this.genders.push(model);
        this.genderUpdate.next([...this.genders]);
      });
  }

  update(model: Gender) {
    this.http
      .post<Gender>(this.url + `api/Gender/Update`, model)
      .subscribe((response) => {
        const index = this.genders.findIndex((e) => e.id == response.id);
        this.genders[index] = response;
        this.genderUpdate.next([...this.genders]);
      });
  }

  delete(id: any) {
    this.http
      .post<Gender>(this.url + `api/Gender/Delete?id=${id}`, null)
      .subscribe((response) => {
        if (response) {
          let res = this.genders.filter((e) => e.id != id);
          this.genders = [...res];
          this.genderUpdate.next([...this.genders]);
        }
      });
  }

}
