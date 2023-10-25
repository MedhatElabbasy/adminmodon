import { TestBed } from '@angular/core/testing';

import { JobtypeService } from './jobtype.service';

describe('JobtypeService', () => {
  let service: JobtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
