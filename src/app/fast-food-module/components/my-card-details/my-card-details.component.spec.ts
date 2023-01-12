import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCardDetailsComponent } from './my-card-details.component';

describe('MyCardDetailsComponent', () => {
  let component: MyCardDetailsComponent;
  let fixture: ComponentFixture<MyCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCardDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
