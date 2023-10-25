import { TestBed } from '@angular/core/testing';

import { AvailableServicesResolver } from './available-services.resolver';

describe('AvailableServicesResolver', () => {
  let resolver: AvailableServicesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AvailableServicesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
