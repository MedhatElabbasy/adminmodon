import { TestBed } from '@angular/core/testing';

import { AdminupdateService } from './adminupdate.service';

describe('AdminupdateService', () => {
  let service: AdminupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
