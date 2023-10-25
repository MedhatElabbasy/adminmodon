import { TestBed } from '@angular/core/testing';

import { TimeZoneResolver } from './time-zone.resolver';

describe('TimeZoneResolver', () => {
  let resolver: TimeZoneResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TimeZoneResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
