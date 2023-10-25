import { TestBed } from '@angular/core/testing';

import { TestNumberResolver } from './test-number.resolver';

describe('TestNumberResolver', () => {
  let resolver: TestNumberResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TestNumberResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
