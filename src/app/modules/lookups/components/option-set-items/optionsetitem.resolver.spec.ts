import { TestBed } from '@angular/core/testing';

import { OptionsetitemResolver } from './optionsetitem.resolver';

describe('OptionsetitemResolver', () => {
  let resolver: OptionsetitemResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OptionsetitemResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
