import { TestBed } from '@angular/core/testing';

import { ApprovedCompaniesResolver } from './approved-companies.resolver';

describe('ApprovedCompaniesResolver', () => {
  let resolver: ApprovedCompaniesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ApprovedCompaniesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
