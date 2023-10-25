import { TestBed } from '@angular/core/testing';

import { JobTypeResolver } from './job-type.resolver';

describe('JobTypeResolver', () => {
  let resolver: JobTypeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(JobTypeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
