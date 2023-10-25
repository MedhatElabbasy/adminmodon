import { TestBed } from '@angular/core/testing';

import { RejectedCompaniesResolver } from './rejected-companies.resolver';

describe('RejectedCompaniesResolver', () => {
  let resolver: RejectedCompaniesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RejectedCompaniesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
