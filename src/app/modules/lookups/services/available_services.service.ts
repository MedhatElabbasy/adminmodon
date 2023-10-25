import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject ,tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AvailableServices } from '../models/available-services';

@Injectable({
  providedIn: 'root'
})
export class Available_servicesService {
  private readonly url = environment.apiUrl;
  private available_servicesUpdate = new Subject<AvailableServices[]>();
  available_services!: AvailableServices[];

constructor(private http: HttpClient) { }

get available_servicesUpdates(): Observable<AvailableServices[]> {
  return this.available_servicesUpdate.asObservable();
}

getAllavailable_services() {
  return this.http.get<AvailableServices[]>(this.url + `api/AvailableServices/GetAll`).pipe(
    tap((response) => {

      this.available_services = response;
      this.available_servicesUpdate.next([...response]);
    })
  );

}

add(model: AvailableServices) {
  this.http
    .post<AvailableServices>(this.url + `api/AvailableServices/Add`, model)
    .subscribe((response) => {
      model.id = response.id;
      this.available_services.push(model);
      this.available_servicesUpdate.next([...this.available_services]);
    });
}
update(model: AvailableServices) {
  this.http
    .post<AvailableServices>(this.url + `api/AvailableServices/Update`, model)
    .subscribe((response) => {
      const index = this.available_services.findIndex((e) => e.id == response.id);
      this.available_services[index] = response;
      this.available_servicesUpdate.next([...this.available_services]);
    });
}
delete(id: any) {
  this.http
    .post<AvailableServices>(this.url + `api/AvailableServices/Delete?id=${id}`, null)
    .subscribe((response) => {
      if (response) {
        let res = this.available_services.filter((e) => e.id != id);
        this.available_services = [...res];
        this.available_servicesUpdate.next([...this.available_services]);
      }
    });
}

}
