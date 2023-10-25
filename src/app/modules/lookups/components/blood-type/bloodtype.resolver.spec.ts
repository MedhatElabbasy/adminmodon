import { TestBed } from '@angular/core/testing';

import { BloodtypeResolver } from './bloodtype.resolver';

describe('BloodtypeResolver', () => {
  let resolver: BloodtypeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BloodtypeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
