import { TestBed } from '@angular/core/testing';

import { FinanceyearResolver } from './financeyear.resolver';

describe('FinanceyearResolver', () => {
  let resolver: FinanceyearResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FinanceyearResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
