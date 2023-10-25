import { TestBed } from '@angular/core/testing';

import { AcceptedContractsResolver } from './accepted-contracts.resolver';

describe('AcceptedContractsResolver', () => {
  let resolver: AcceptedContractsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AcceptedContractsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
