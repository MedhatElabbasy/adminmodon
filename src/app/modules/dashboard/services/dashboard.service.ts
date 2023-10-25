import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  all():Observable<any>{
   return this.http.get(this.url+`api/Statistic/GetAllStatistic`)
   
  }
}
