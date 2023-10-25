import { TestBed } from '@angular/core/testing';

import { TimeTypeResolver } from './time-type.resolver';

describe('TimeTypeResolver', () => {
  let resolver: TimeTypeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TimeTypeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
