import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject ,tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { BloodType } from '../models/bloodType';

@Injectable({
  providedIn: 'root'
})
export class BloodTypeService {
  private readonly url = environment.apiUrl;
  private bloodUpdate = new Subject<BloodType[]>();
  bloodtypes!: BloodType[];

  constructor(private http: HttpClient) { }


  get bloodUpdates(): Observable<BloodType[]> {
    return this.bloodUpdate.asObservable();
  }

  getAllbloodtypes() {
    return this.http.get<BloodType[]>(this.url + `api/BloodType/GetAll`).pipe(
      tap((response) => {

        this.bloodtypes = response;
        this.bloodUpdate.next([...response]);
      })
    );
  }

  add(model: BloodType) {
    this.http
      .post<BloodType>(this.url + `api/BloodType/Add`, model)
      .subscribe((response) => {
        model.id = response.id;
        this.bloodtypes.push(model);
        this.bloodUpdate.next([...this.bloodtypes]);
      });
  }

  update(model: BloodType) {
    this.http
      .post<BloodType>(this.url + `api/BloodType/Update`, model)
      .subscribe((response) => {
        const index = this.bloodtypes.findIndex((e) => e.id == response.id);
        this.bloodtypes[index] = response;
        this.bloodUpdate.next([...this.bloodtypes]);
      });
  }

  delete(id: any) {
    this.http
      .post<BloodType>(this.url + `api/BloodType/Delete?id=${id}`, null)
      .subscribe((response) => {
        if (response) {
          let res = this.bloodtypes.filter((e) => e.id != id);
          this.bloodtypes = [...res];
          this.bloodUpdate.next([...this.bloodtypes]);
        }
      });
  }
}
