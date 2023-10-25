import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsPlanComponent } from './subscriptions-plan.component';

describe('SubscriptionsPlanComponent', () => {
  let component: SubscriptionsPlanComponent;
  let fixture: ComponentFixture<SubscriptionsPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionsPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
