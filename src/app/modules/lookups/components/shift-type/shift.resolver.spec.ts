import { TestBed } from '@angular/core/testing';

import { ShiftResolver } from './shift.resolver';

describe('ShiftResolver', () => {
  let resolver: ShiftResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ShiftResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
