/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OffcanvasService } from './offcanvas.service';

describe('Service: Offcanvas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OffcanvasService]
    });
  });

  it('should ...', inject([OffcanvasService], (service: OffcanvasService) => {
    expect(service).toBeTruthy();
  }));
});
