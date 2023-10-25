import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AvailableServices } from '../../models/available-services';
import { Available_servicesService } from '../../services/available_services.service';

@Injectable({
  providedIn: 'root'
})
export class AvailableServicesResolver implements Resolve<AvailableServices[]> {
  constructor(private availableServices: Available_servicesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<AvailableServices[]> {
    return this.availableServices.getAllavailable_services();
  }
}
