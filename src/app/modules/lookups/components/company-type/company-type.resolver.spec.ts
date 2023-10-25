import { TestBed } from '@angular/core/testing';

import { CompanyTypeResolver } from './company-type.resolver';

describe('CompanyTypeResolver', () => {
  let resolver: CompanyTypeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompanyTypeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
