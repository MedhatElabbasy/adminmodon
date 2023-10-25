import { TestBed } from '@angular/core/testing';

import { NationalityResolver } from './nationality.resolver';

describe('NationalityResolver', () => {
  let resolver: NationalityResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NationalityResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
