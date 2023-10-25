import { TestBed } from '@angular/core/testing';

import { RasdService } from './rasd.service';

describe('RasdService', () => {
  let service: RasdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RasdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
