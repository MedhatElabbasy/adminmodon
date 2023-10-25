import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject ,tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area } from '../models/Area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private readonly url = environment.apiUrl;
  private AreasUpdate = new Subject<Area[]>();
  areas!: Area[];



  constructor(private http: HttpClient) { }

  get AreasUpdates(): Observable<Area[]> {
    return this.AreasUpdate.asObservable();
  }


  getAllAreas() {
    return this.http.get<Area[]>(this.url + `api/Area/GetAll`).pipe(
      tap((response) => {

        this.areas = response;
        this.AreasUpdate.next([...response]);
      })
    );
  }

  add(model: Area) {
    this.http
      .post<Area>(this.url + `api/Area/Add`, model)
      .subscribe((response) => {
        model.id = response.id;
        this.areas.push(model);
        this.AreasUpdate.next([...this.areas]);
      });
  }

  update(model: Area) {
    this.http
      .post<Area>(this.url + `api/Area/Update`, model)
      .subscribe((response) => {
        const index = this.areas.findIndex((e) => e.id == response.id);
        this.areas[index] = response;
        this.AreasUpdate.next([...this.areas]);
      });
  }

  delete(id: any) {
    this.http
      .post<Area>(this.url + `api/Area/Delete?id=${id}`, null)
      .subscribe((response) => {
        if (response) {
          let res = this.areas.filter((e) => e.id != id);
          this.areas = [...res];
          this.AreasUpdate.next([...this.areas]);
        }
      });
  }

}
