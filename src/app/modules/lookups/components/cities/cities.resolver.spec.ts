import { TestBed } from '@angular/core/testing';

import { CitiesResolver } from './cities.resolver';

describe('CitiesResolver', () => {
  let resolver: CitiesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CitiesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
