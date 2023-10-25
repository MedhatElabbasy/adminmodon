import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Loader } from '../../core/enum/loader.enum';
import { Accident } from '../models/accident';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAccidentsByDate(date: string,enddate:string, loader: Loader) {
    return this.http.get<Accident[]>(
      this.url + `api/Incident/GetAllBy2Date?SatrtDate=${date}&EndDate=${enddate}`,
      {
        headers: {
          loader: loader,
        },
      }
    ).pipe(  map((res) => {
      res = res.map((e) => {
        e.gallery = e.incidentAttachments.map((a) => a.attachment.fullLink);
        return e;
      });

      return res;
    }));
  }
}
