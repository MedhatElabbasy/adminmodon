import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceYearComponent } from './finance-year.component';

describe('FinanceYearComponent', () => {
  let component: FinanceYearComponent;
  let fixture: ComponentFixture<FinanceYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
