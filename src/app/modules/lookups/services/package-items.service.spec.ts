import { TestBed } from '@angular/core/testing';

import { PackageItemsService } from './package-items.service';

describe('PackageItemsService', () => {
  let service: PackageItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
