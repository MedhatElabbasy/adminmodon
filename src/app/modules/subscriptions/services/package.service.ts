import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Package, PackageDetails } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
   public limit = new BehaviorSubject(0)
  private readonly url = environment.apiUrl;
  constructor(private _http:HttpClient) { }

  getAll(): Observable<any>{
   return this._http.get(this.url+`api/Package/GetAll`);
  }

  addPackage(model:Package){
    return this._http.post(this.url+`api/Package/Add`,model)
   }


   deletePackage(id:string){
    return this._http.post(this.url+`api/Package/Delete?id=${id}`,null)
   }

   updatePackage(model:Package){
    return this._http.post(this.url+`api/Package/Update`,model)
   }


   addPackageDetails(model:PackageDetails){
    return this._http.post(this.url+`api/PackageDetails/Add`,model)
   }


   deletePackageDetails(id:string){
    return this._http.post(this.url+`api/PackageDetails/Delete?id=${id}`,null)
   }
}
