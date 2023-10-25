import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OptionSetItems } from '../models/option-set-items';

@Injectable({
  providedIn: 'root',
})
export class OptionSetItemsService {
  private readonly url = environment.apiUrl;
  optionSetItems!: OptionSetItems[];
  private optionSetItemsUpdates = new Subject<OptionSetItems[]>();

  constructor(private http: HttpClient) {}

  get updates() {
    return this.optionSetItemsUpdates.asObservable();
  }
  getAllOptionSetItems(id: any) {
    return this.http
      .get<OptionSetItems[]>(this.url + `api/OptionSetItems/GetAll?id=${id}`)
      .pipe(
        tap((response) => {
          let res = response.filter((e: { id: any }) => e.id == id);
          this.optionSetItems = [...res];
          this.optionSetItemsUpdates.next([...this.optionSetItems]);
          console.log(res);
        }),
        map((response) => response.sort((a, b) => a.value - b.value))
      );
  }
  delete(id: any) {
    return this.http.post<OptionSetItems>(
      this.url + `api/OptionSetItems/Delete?id=${id}`,
      null
    );
  }

  add(model: OptionSetItems) {
    return this.http.post<OptionSetItems>(
      this.url + `api/OptionSetItems/Add`,
      model
    );
  }
  update(model: OptionSetItems) {
    return this.http.post<OptionSetItems>(
      this.url + `api/OptionSetItems/Update`,
      model
    );
  }
}
