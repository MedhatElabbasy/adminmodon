import { TestBed } from '@angular/core/testing';

import { OptionSetItemsService } from './option-set-items.service';

describe('OptionSetItemsService', () => {
  let service: OptionSetItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionSetItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
