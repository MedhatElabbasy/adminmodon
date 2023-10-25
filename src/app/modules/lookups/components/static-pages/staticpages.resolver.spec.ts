import { TestBed } from '@angular/core/testing';

import { StaticpagesResolver } from './staticpages.resolver';

describe('StaticpagesResolver', () => {
  let resolver: StaticpagesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StaticpagesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
