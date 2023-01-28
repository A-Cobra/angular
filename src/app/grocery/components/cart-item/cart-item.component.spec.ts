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
      // We simulate to introduce a letter
      component.quantity.nativeElement.value = 'a';
      const updateQuantityButton = debugElement.query(
        By.css('.update-quantity-button')
      );
      updateQuantityButton.triggerEventHandler('click', null);
      // We simulate to introduce a negative number
      component.quantity.nativeElement.value = -6;
      updateQuantityButton.triggerEventHandler('click', null);
      expect(
        mockNotificationsService.notifyNonNegativeQuantity
      ).toHaveBeenCalledTimes(2);
    });
    test('that the event is emitted if the quantity is a positive integer', () => {
      // We simulate to introduce a positive integer
      jest.spyOn(component.cartItemUpdate, 'emit');
      component.quantity.nativeElement.value = 5;
      const updateQuantityButton = debugElement.query(
        By.css('.update-quantity-button')
      );
      updateQuantityButton.triggerEventHandler('click', null);
      expect(component.cartItemUpdate.emit).toHaveBeenCalledTimes(1);
      expect(component.cartItemUpdate.emit).toHaveBeenCalledWith({
        data: {
          items: [
            {
              id: component.cartItem.id,
              quantity: parseInt(component.quantity.nativeElement.value),
            },
          ],
        },
      });
    });
    test('that when the user presses yes in the confirmation dialog, the event is emitted', () => {
      jest.spyOn(window, 'confirm').mockImplementation(() => true);
      const removeButton = debugElement.query(By.css('.fa-solid'));
      jest.spyOn(component, 'onDelete');
      jest.spyOn(component.cartItemRemoval, 'emit');
      removeButton.triggerEventHandler('click', null);
      expect(component.onDelete).toHaveBeenCalledTimes(1);
      expect(component.onDelete).toHaveBeenCalledWith(component.cartItem.id);
      expect(component.cartItemRemoval.emit).toHaveBeenCalledTimes(1);
      expect(component.cartItemRemoval.emit).toHaveBeenCalledWith({
        data: {
          items: [
            {
              id: component.cartItem.id,
              _destroy: true,
            },
          ],
        },
      });
    });
  });
});
