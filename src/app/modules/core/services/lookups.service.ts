import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../../lookups/models/country';
import { Lookup } from '../../lookups/models/lookup';
import { LookupNames } from '../enum/lookups';

@Injectable({
  providedIn: 'root',
})
export class LookupsService {
  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNationality(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.nationality}`
    );
  }

  getBloodType(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.bloodType}`
    );
  }

  getCity(nationalityId?: string): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.city}${
          nationalityId ? `&id=${nationalityId}` : ''
        }`
    );
  }

  getGender(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.gender}`
    );
  }

  getJobType(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.jobType}`
    );
  }

  getAreas(cityId: string): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.area}&id=${cityId}`
    );
  }

  getAvailableServices(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.availableServices}`
    );
  }

  getCompanyScale(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.companyScale}`
    );
  }

  getFinanceYear(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.financeYear}`
    );
  }

  getTimeZone(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.timeZone}`
    );
  }

  getCountriesCodes(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url + `api/Country/GetAllCountry`);
  }

  getCompanyType(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.companyType}`
    );
  }

  getBusinessTypes() {
    return this.http.get<Lookup[]>(this.url + `api/BusinessType/GetAll`);
  }
}
