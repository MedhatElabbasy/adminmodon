import { TestBed } from '@angular/core/testing';

import { OptionsetResolver } from './optionset.resolver';

describe('OptionsetResolver', () => {
  let resolver: OptionsetResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OptionsetResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
