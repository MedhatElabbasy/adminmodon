import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private readonly url = environment.apiUrl;
  private citiesUpdate = new Subject<City[]>();
  cities!: City[];

  constructor(private http: HttpClient) {}

  get CitiesUpdates(): Observable<City[]> {
    return this.citiesUpdate.asObservable();
  }

  getAllCities() {
    return this.http.get<City[]>(this.url + `api/City/GetAll`).pipe(
      tap((response) => {
        this.cities = response;
        this.citiesUpdate.next([...response]);
      })
    );
  }

  add(model: City) {
    this.http
      .post<City>(this.url + `api/City/Add`, model)
      .subscribe((response) => {
        model.id = response.id;
        this.cities.push(model);
        this.citiesUpdate.next([...this.cities]);
      });
  }

  update(model: City) {
    this.http
      .post<City>(this.url + `api/City/Update`, model)
      .subscribe((response) => {
        const index = this.cities.findIndex((e) => e.id == response.id);
        this.cities[index] = response;
        this.citiesUpdate.next([...this.cities]);
      });
  }

  delete(id: any) {
    this.http
      .post<City>(this.url + `api/City/Delete?id=${id}`, null)
      .subscribe((response) => {
        let res = this.cities.filter((e) => e.id != id);
        this.cities = [...res];
        this.citiesUpdate.next([...this.cities]);
      });
  }
}
