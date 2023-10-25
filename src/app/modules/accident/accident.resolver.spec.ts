import { TestBed } from '@angular/core/testing';

import { AccidentResolver } from './accident.resolver';

describe('AccidentResolver', () => {
  let resolver: AccidentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AccidentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
