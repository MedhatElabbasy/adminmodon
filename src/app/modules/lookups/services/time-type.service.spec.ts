/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TimeTypeService } from './time-type.service';

describe('Service: TimeType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeTypeService]
    });
  });

  it('should ...', inject([TimeTypeService], (service: TimeTypeService) => {
    expect(service).toBeTruthy();
  }));
});
