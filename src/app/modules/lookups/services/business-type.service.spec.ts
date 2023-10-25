/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BusinessTypeService } from './business-type.service';

describe('Service: BusinessType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessTypeService]
    });
  });

  it('should ...', inject([BusinessTypeService], (service: BusinessTypeService) => {
    expect(service).toBeTruthy();
  }));
});
