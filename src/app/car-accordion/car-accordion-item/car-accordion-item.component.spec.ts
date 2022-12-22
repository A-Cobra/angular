import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAccordionItemComponent } from './car-accordion-item.component';

describe('CarAccordionItemComponent', () => {
  let component: CarAccordionItemComponent;
  let fixture: ComponentFixture<CarAccordionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarAccordionItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
