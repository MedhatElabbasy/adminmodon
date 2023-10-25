import { TestBed } from '@angular/core/testing';

import { TestNumberService } from './test-number.service';

describe('TestNumberService', () => {
  let service: TestNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
