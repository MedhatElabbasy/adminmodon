/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Available_servicesService } from './available_services.service';

describe('Service: Available_services', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Available_servicesService]
    });
  });

  it('should ...', inject([Available_servicesService], (service: Available_servicesService) => {
    expect(service).toBeTruthy();
  }));
});
