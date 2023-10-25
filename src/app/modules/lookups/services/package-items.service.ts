import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageItemsService {
  private readonly url= environment.apiUrl;
  constructor(private _http:HttpClient) { }
   
  getAll():Observable<any>{
    return this._http.get(this.url+`api/PackageItems/GetAll`);
  }




addPackageItem(model:any){
 return this._http.post(this.url+`api/PackageItems/Add`,model)
}



updatePackageItem(model:any){
 return this._http.post(this.url+`api/PackageItems/Update`,model)
}


deletePackageItem(id:string){
 return this._http.post(this.url+`api/PackageItems/Delete?id=${id}`,null)
}
}