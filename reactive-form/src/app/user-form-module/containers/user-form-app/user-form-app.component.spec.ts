import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormAppComponent } from './user-form-app.component';

describe('UserFormAppComponent', () => {
  let component: UserFormAppComponent;
  let fixture: ComponentFixture<UserFormAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormAppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
