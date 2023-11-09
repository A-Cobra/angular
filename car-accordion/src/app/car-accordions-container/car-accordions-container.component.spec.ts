import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAccordionComponent } from './car-accordions-container.component';

describe('CarAccordionComponent', () => {
  let component: CarAccordionComponent;
  let fixture: ComponentFixture<CarAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
