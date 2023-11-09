import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFoodAppComponent } from './fast-food-app.component';

describe('FastFoodAppComponent', () => {
  let component: FastFoodAppComponent;
  let fixture: ComponentFixture<FastFoodAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FastFoodAppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FastFoodAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
