import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerIngredientComponent } from './hamburger-ingredient.component';

describe('HamburgerIngredientComponent', () => {
  let component: HamburgerIngredientComponent;
  let fixture: ComponentFixture<HamburgerIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HamburgerIngredientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HamburgerIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
