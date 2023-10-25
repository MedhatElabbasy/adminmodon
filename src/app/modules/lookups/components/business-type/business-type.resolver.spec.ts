import { TestBed } from '@angular/core/testing';

import { BusinessTypeResolver } from './business-type.resolver';

describe('BusinessTypeResolver', () => {
  let resolver: BusinessTypeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BusinessTypeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
