/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompanyTypeService } from './company-type.service';

describe('Service: CompanyType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyTypeService]
    });
  });

  it('should ...', inject([CompanyTypeService], (service: CompanyTypeService) => {
    expect(service).toBeTruthy();
  }));
});
