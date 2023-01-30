import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CartData } from 'src/app/models/cart/cart-data.interface';
import { CartService } from '../../services/cart/cart.service';
import { NotificationsService } from '../../services/notifications.service';
import { defaultCartDataResponse } from '../../services/test-utils/cart/default-cart-data-response';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let mockNotificationsService!: {
    notifyCartEmpty: () => void;
    notifyQueryError: () => void;
    notifyItemRemovedSuccessfully: () => void;
    notifyItemUpdatedSuccessfully: () => void;
    notifyNotEnoughStock: () => void;
    notifyCartEmptiedSuccess: () => void;
    notifyCartEmptiedFailure: () => void;
  };
  let mockCartService!: {
    getCartData: () => Observable<CartData>;
    removeItemFromCart: () => Observable<CartData>;
    updateItemQuantity: () => Observable<CartData>;
    removeAllCartItems: () => Observable<boolean>;
  };
  let mockRouter!: {
    navigate: () => void;
  };

  beforeEach(async () => {
    mockNotificationsService = {
      notifyCartEmpty: jest.fn(),
      notifyQueryError: jest.fn(),
      notifyItemRemovedSuccessfully: jest.fn(),
      notifyItemUpdatedSuccessfully: jest.fn(),
      notifyNotEnoughStock: jest.fn(),
      notifyCartEmptiedSuccess: jest.fn(),
      notifyCartEmptiedFailure: jest.fn(),
    };
    mockCartService = {
      getCartData: jest.fn(),
      removeItemFromCart: jest.fn(),
      updateItemQuantity: jest.fn(),
      removeAllCartItems: jest.fn(),
    };
    mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: NotificationsService, useValue: mockNotificationsService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    // So that ngOnInit doesn't give problems;
    jest
      .spyOn(mockCartService, 'getCartData')
      .mockReturnValue(of(defaultCartDataResponse));
  });
  describe('Typescript Tests', () => {
    test('should create CartComponent', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
    test('that ngOnInit triggers cartService getCartData method', () => {
      fixture.detectChanges();
      expect(mockCartService.getCartData).toHaveBeenCalledTimes(1);
    });
    test('that cartService getCartData method was successfully called', () => {
      mockCartService.getCartData().subscribe({
        next: (cartData: CartData) => {
          expect(cartData).toBe(defaultCartDataResponse);
        },
      });
    });
  });
});
