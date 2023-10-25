import { TestBed } from '@angular/core/testing';

import { GenderResolver } from './gender.resolver';

describe('GenderResolver', () => {
  let resolver: GenderResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GenderResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
