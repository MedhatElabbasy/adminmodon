import { TestBed } from '@angular/core/testing';

import { CountriesCodesResolver } from './countries-codes.resolver';

describe('CountriesCodesResolver', () => {
  let resolver: CountriesCodesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CountriesCodesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
