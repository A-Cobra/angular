import { CartItemComponent } from './cart-item.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core/';
import { NotificationsService } from '../../services/notifications.service';
import { By } from '@angular/platform-browser';
import { defaultCartItem } from './test-models/default-cart-item';

describe('CartItemComponent Tests', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  let debugElement: DebugElement;
  let mockNotificationsService!: {
    notifyNonEqualUpdate: () => void;
    notifyNonNegativeQuantity: () => void;
  };

  beforeEach(async () => {
    mockNotificationsService = {
      notifyNonEqualUpdate: jest.fn(),
      notifyNonNegativeQuantity: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [CartItemComponent],
      providers: [
        { provide: NotificationsService, useValue: mockNotificationsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    //We suppose that the input was passed
    component.cartItem = defaultCartItem;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('Typescript Tests', () => {
    test('that the ProductVisualizerComponent must be initialized', () => {
      expect(component).toBeTruthy();
    });
    test('that the input is successfully passed', () => {
      expect(component.cartItem).not.toBe(null);
    });
    test('that the notifications service notifies that the same quantity can not be updated', () => {
      // We set 6 as a quantity for the native element
      component.quantity.nativeElement.value = 6;
      // And we set it back to 1 again
      component.quantity.nativeElement.value = 1;
      const updateQuantityButton = debugElement.query(
        By.css('.update-quantity-button')
      );
      jest.spyOn(component, 'onQuantityUpdate');
      updateQuantityButton.triggerEventHandler('click', null);
      expect(component.onQuantityUpdate).toHaveBeenCalledTimes(1);
    });
    test('that the notifications service notifies that the quantity can not be negative or null', () => {
      // const updateQuantityInput = debugElement.query(
      //   By.css('.update-quantity-input')
      // );
      // // We simulate to introduce a letter
      // updateQuantityInput.triggerEventHandler('click', null);
      // updateQuantityInput.triggerEventHandler('change', 'a');
      component.quantity.nativeElement.value = 'a';
      const updateQuantityButton = debugElement.query(
        By.css('.update-quantity-button')
      );
      updateQuantityButton.triggerEventHandler('click', null);
      expect(
        mockNotificationsService.notifyNonNegativeQuantity
      ).toHaveBeenCalledTimes(1);
    });
  });
});
