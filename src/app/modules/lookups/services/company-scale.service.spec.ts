/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompanyScaleService } from './company-scale.service';

describe('Service: CompanyScale', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyScaleService]
    });
  });

  it('should ...', inject([CompanyScaleService], (service: CompanyScaleService) => {
    expect(service).toBeTruthy();
  }));
});
