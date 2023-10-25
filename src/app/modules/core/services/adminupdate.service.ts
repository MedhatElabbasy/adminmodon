import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminupdateService {
  
  private  url = environment.apiUrl;
  constructor(private http: HttpClient) { 
    
  }

  update(Form:any):Observable<any>{
    return this.http.post(this.url+`api/TakidAdmin/Update`,Form);
  }
}
