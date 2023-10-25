import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly url = environment.apiUrl;
  countries!: Country[];
  private countryUpdates = new Subject<Country[]>();
  constructor(private http: HttpClient) {}

  get updates() {
    return this.countryUpdates.asObservable();
  }

  getAllCountries() {
    return this.http
      .get<Country[]>(this.url + `api/Country/GetAllCountry`)
      .pipe(
        tap((res) => {
          this.countries = [...res];
          this.countryUpdates.next([...this.countries]);
        })
      );
  }

  add(model: Country) {
    this.http
      .post<Country>(this.url + `api/Country/AddCountry`, model)
      .subscribe((response) => {
        model.id = response.id;
        this.countries.push(model);
        this.countryUpdates.next([...this.countries]);
      });
  }

  update(model: Country) {
    this.http
      .post<Country>(this.url + `api/Country/UpdateCountry`, model)
      .subscribe((response) => {
        const index = this.countries.findIndex((e) => e.id == response.id);
        this.countries[index] = response;
        this.countryUpdates.next([...this.countries]);
      });
  }

  delete(id: any) {
    this.http
      .post<Country>(
        this.url + `api/Country/DeleteCountry?countryId=${id}`,
        null
      )
      .subscribe((response) => {
        if (response) {
          if (response) {
            let res = this.countries.filter((e) => e.id != id);
            this.countries = [...res];
            this.countryUpdates.next([...this.countries]);
          }
        }
      });
  }
}
