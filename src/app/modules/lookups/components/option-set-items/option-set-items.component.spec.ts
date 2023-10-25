import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSetItemsComponent } from './option-set-items.component';

describe('OptionSetItemsComponent', () => {
  let component: OptionSetItemsComponent;
  let fixture: ComponentFixture<OptionSetItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionSetItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionSetItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
