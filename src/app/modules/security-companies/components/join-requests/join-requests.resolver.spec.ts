import { TestBed } from '@angular/core/testing';

import { JoinRequestsResolver } from './join-requests.resolver';

describe('JoinRequestsResolver', () => {
  let resolver: JoinRequestsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(JoinRequestsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
