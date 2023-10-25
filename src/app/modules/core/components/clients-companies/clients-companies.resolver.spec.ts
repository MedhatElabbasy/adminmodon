import { TestBed } from '@angular/core/testing';

import { ClientsCompaniesResolver } from './clients-companies.resolver';

describe('ClientsCompaniesResolver', () => {
  let resolver: ClientsCompaniesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClientsCompaniesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
