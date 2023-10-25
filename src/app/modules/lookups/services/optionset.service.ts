import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject ,tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { OptionSet } from '../models/option-set';

@Injectable({
  providedIn: 'root'
})
export class OptionsetService {
  private readonly url = environment.apiUrl;
  optionsets!:OptionSet[];
  private optionSetUpdates = new Subject<OptionSet[]>();


  constructor(private http: HttpClient) { }

  get updates() {
    return this.optionSetUpdates.asObservable();
  }

  getAllOptionSets(){
    return this.http
      .get<OptionSet[]>(this.url + `api/OptionSet/GetAll`)
      .pipe(
        tap((res) => {
          this.optionsets = [...res];
          this.optionSetUpdates.next([...this.optionsets]);
        })
      );

  }

  add(model: OptionSet) {
    this.http
      .post<OptionSet>(this.url + `api/OptionSet/Add`, model)
      .subscribe((response) => {
        model.id = response.id;
        this.optionsets.push(model);
        this.optionSetUpdates.next([...this.optionsets]);
      });
  }
  update(model: OptionSet) {
    this.http
      .post<OptionSet>(this.url + `api/OptionSet/Update`, model)
      .subscribe((response) => {
        const index = this.optionsets.findIndex((e) => e.id == response.id);
        this.optionsets[index] = response;
        this.optionSetUpdates.next([...this.optionsets]);
      });
  }

  delete(id: any) {
    this.http
      .post<OptionSet>(
        this.url + `api/OptionSet/Delete?id=${id}`,
        null
      )
      .subscribe((response) => {
        if (response) {
          if (response) {
            let res = this.optionsets.filter((e) => e.id != id);
            this.optionsets = [...res];
            this.optionSetUpdates.next([...this.optionsets]);
          }
        }
      });
  }
  getOPtionSetByName(name:string){
   return this.http.get<OptionSet>(this.url+`api/OptionSet/GetByName?name=${name}`)
    .pipe(tap((response)=>{
      console.log(response);
      
      // if(response){
      //   let res= this.optionsets.filter((e)=>e.name==name);
      //   this.optionsets = [...res];
      //   this.optionSetUpdates.next([...this.optionsets]);
      //   console.log(res);

      // }


    }))
  }
}
