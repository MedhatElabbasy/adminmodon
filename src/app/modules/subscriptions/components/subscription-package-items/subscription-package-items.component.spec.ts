import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPackageItemsComponent } from './subscription-package-items.component';

describe('SubscriptionPackageItemsComponent', () => {
  let component: SubscriptionPackageItemsComponent;
  let fixture: ComponentFixture<SubscriptionPackageItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionPackageItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPackageItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
