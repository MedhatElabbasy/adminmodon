import { TestBed } from '@angular/core/testing';

import { FinanceYearService } from './finance-year.service';

describe('FinanceYearService', () => {
  let service: FinanceYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
