import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasdUsersComponent } from './rasd-users.component';

describe('RasdUsersComponent', () => {
  let component: RasdUsersComponent;
  let fixture: ComponentFixture<RasdUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasdUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RasdUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
