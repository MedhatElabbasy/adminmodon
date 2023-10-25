import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodTypeComponent } from './blood-type.component';

describe('BloodTypeComponent', () => {
  let component: BloodTypeComponent;
  let fixture: ComponentFixture<BloodTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
