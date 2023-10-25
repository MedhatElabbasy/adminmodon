/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientsCompaniesService } from './clients-companies.service';

describe('Service: ClientsCompanies', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientsCompaniesService]
    });
  });

  it('should ...', inject([ClientsCompaniesService], (service: ClientsCompaniesService) => {
    expect(service).toBeTruthy();
  }));
});
