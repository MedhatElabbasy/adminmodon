/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TimeZoneService } from './time-zone.service';

describe('Service: TimeZone', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeZoneService]
    });
  });

  it('should ...', inject([TimeZoneService], (service: TimeZoneService) => {
    expect(service).toBeTruthy();
  }));
});
