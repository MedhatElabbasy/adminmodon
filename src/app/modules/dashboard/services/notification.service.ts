import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Header } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) {}
  
 
  notification(pageNumber:number ,pageSize:number ):Observable<any>{
    return this.http.get(this.url +`api/Notification/GetAllForTakidAdmin?page=${pageNumber}&pageSize=${pageSize}`,{
     headers:{
      'loader':'true'
     }

    })
  }
}
