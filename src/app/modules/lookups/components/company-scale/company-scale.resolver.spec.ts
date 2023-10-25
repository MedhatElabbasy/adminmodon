import { TestBed } from '@angular/core/testing';

import { CompanyScaleResolver } from './company-scale.resolver';

describe('CompanyScaleResolver', () => {
  let resolver: CompanyScaleResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompanyScaleResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
