import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPreviewMenuComponent } from './cart-preview-menu.component';

describe('CartPreviewMenuComponent', () => {
  let component: CartPreviewMenuComponent;
  let fixture: ComponentFixture<CartPreviewMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartPreviewMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPreviewMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
