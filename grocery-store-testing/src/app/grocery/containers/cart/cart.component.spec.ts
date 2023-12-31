import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { CartData } from 'src/app/models/cart/cart-data.interface';
import { CartPayloadForRemoval } from 'src/app/models/cart/cart-payload-for-removal.type';
import { CartPayloadForUpdate } from 'src/app/models/cart/cart-payload-for-update.type';
import { CartService } from '../../services/cart/cart.service';
import { NotificationsService } from '../../services/notifications.service';
import { defaultCartPayloadForRemoval } from '../../services/test-utils/cart/cart-payload-for-removal';
import { defaultCartDataResponse } from '../../services/test-utils/cart/default-cart-data-response';
import { defaultCartFailureResponse } from '../../services/test-utils/cart/default-cart-failure-response';
import { defaultCartPayloadForUpdate } from '../../services/test-utils/cart/default-payload-for-update';

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
    removeItemFromCart: (
      payload: CartPayloadForRemoval
    ) => Observable<CartData>;
    updateItemQuantity: (payload: CartPayloadForUpdate) => Observable<CartData>;
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
    //ngOnInit
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
    test('that cartService getCartData method was unsuccessfully called with Error 404', () => {
      const response = defaultCartFailureResponse;
      jest
        .spyOn(mockCartService, 'getCartData')
        .mockReturnValue(throwError(() => response));
      // RESPONSE has a 404 status by default
      jest.spyOn(mockNotificationsService, 'notifyCartEmpty');
      mockCartService.getCartData().subscribe({
        error: () => {
          expect(
            mockNotificationsService.notifyCartEmpty
          ).toHaveBeenCalledTimes(1);
        },
      });
    });
    test('that cartService getCartData method was unsuccessfully called with another error', () => {
      const response = { ...defaultCartFailureResponse };
      response.status = 303;
      jest
        .spyOn(mockCartService, 'getCartData')
        .mockReturnValue(throwError(() => response));
      // .mockReturnValue(null);
      // RESPONSE has a 404 status by default
      jest.spyOn(mockNotificationsService, 'notifyQueryError');
      mockCartService.getCartData().subscribe({
        error: () => {
          expect(
            mockNotificationsService.notifyQueryError
          ).toHaveBeenCalledTimes(1);
        },
      });
    });
    test('to be redirected once there was an error with the cartComponent', () => {
      const response = { ...defaultCartFailureResponse };
      response.status = 303;
      jest
        .spyOn(mockCartService, 'getCartData')
        .mockReturnValue(throwError(() => response));
      jest.spyOn(mockRouter, 'navigate');
      jest.spyOn(mockNotificationsService, 'notifyQueryError');
      mockCartService.getCartData().subscribe({
        error: () => {
          expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
          expect(mockRouter.navigate).toHaveBeenCalledWith([
            'grocery-store',
            'home',
            'all-products',
          ]);
        },
      });
    });
    // onCartItemRemoval
    test('that onCartItemRemoval triggers the cartService', () => {
      jest
        .spyOn(mockCartService, 'removeItemFromCart')
        .mockReturnValue(of(defaultCartDataResponse));
      component.onCartItemRemoval(defaultCartPayloadForRemoval);
      expect(mockCartService.removeItemFromCart).toHaveBeenCalledTimes(1);
    });
    test('that the method updateItemQuantity from the cartService returns a successful response', () => {
      jest
        .spyOn(mockCartService, 'removeItemFromCart')
        .mockReturnValue(of(defaultCartDataResponse));
      mockCartService
        .removeItemFromCart(defaultCartPayloadForRemoval)
        .subscribe({
          next: (cartData: CartData) => {
            expect(component.cartData).toBe(cartData);
            expect(
              mockNotificationsService.notifyItemRemovedSuccessfully
            ).toHaveBeenCalledTimes(1);
          },
        });
    });
    test('that the method updateItemQuantity from the cartService returns a failure response', () => {
      jest
        .spyOn(mockCartService, 'removeItemFromCart')
        .mockReturnValue(throwError(() => defaultCartFailureResponse));
      mockCartService
        .removeItemFromCart(defaultCartPayloadForRemoval)
        .subscribe({
          error: () => {
            expect(
              mockNotificationsService.notifyQueryError
            ).toHaveBeenCalledTimes(1);
          },
        });
    });
    //onCartItemUpdate
    test("that onCartItemUpdate triggers the cartService's method updateItemQuantity", () => {
      jest
        .spyOn(mockCartService, 'updateItemQuantity')
        .mockReturnValue(of(defaultCartDataResponse));
      component.onCartItemUpdate(defaultCartPayloadForUpdate);
      expect(mockCartService.updateItemQuantity).toHaveBeenCalledTimes(1);
    });
    test("that there was a successful response in the cartService's method updateItemQuantity", () => {
      jest
        .spyOn(mockCartService, 'updateItemQuantity')
        .mockReturnValue(of(defaultCartDataResponse));
      mockCartService
        .updateItemQuantity(defaultCartPayloadForUpdate)
        .subscribe({
          next: (cartData: CartData) => {
            expect(component.cartData).toBe(cartData);
            expect(
              mockNotificationsService.notifyItemUpdatedSuccessfully
            ).toHaveBeenCalledTimes(1);
          },
        });
    });
    test("that there was a failure response in the cartService's method updateItemQuantity", () => {
      jest
        .spyOn(mockCartService, 'updateItemQuantity')
        .mockReturnValue(throwError(() => defaultCartFailureResponse));
      mockCartService
        .updateItemQuantity(defaultCartPayloadForUpdate)
        .subscribe({
          error: (errorCode: Error) => {
            expect(errorCode).toBe(
              defaultCartFailureResponse.error.errors[0].code
            );
            expect(
              mockNotificationsService.notifyNotEnoughStock
            ).toHaveBeenCalledTimes(1);
            // if (errorCode.message === '4e6f7420656e6f7567682073746f636b') {
            //   this.notificationsService.notifyNotEnoughStock();
            // }
          },
        });
    });
    //onAllItemsRemoval
    test("that onAllItemsRemoval triggers the cartService's method removeAllCartItems", () => {
      jest
        .spyOn(mockCartService, 'removeAllCartItems')
        .mockReturnValue(of(true));
      component.onAllItemsRemoval();
      expect(mockCartService.removeAllCartItems).toHaveBeenCalledTimes(1);
    });
    test("that there was a successful response in the cartService's method onAllItemsRemoval", () => {
      jest
        .spyOn(mockCartService, 'removeAllCartItems')
        .mockReturnValue(of(true));
      mockCartService.removeAllCartItems().subscribe({
        next: () => {
          expect(
            mockNotificationsService.notifyCartEmptiedSuccess
          ).toHaveBeenCalledTimes(1);
        },
      });
    });
    test("that there was a failure response in the cartService's method onAllItemsRemoval", () => {
      jest
        .spyOn(mockCartService, 'removeAllCartItems')
        .mockReturnValue(of(false));
      mockCartService.removeAllCartItems().subscribe({
        next: () => {
          expect(
            mockNotificationsService.notifyCartEmptiedFailure
          ).toHaveBeenCalledTimes(1);
        },
      });
    });
    test("that there is a redirection once the cartService's method onAllItemsRemoval has completed", () => {
      jest
        .spyOn(mockCartService, 'removeAllCartItems')
        .mockReturnValue(of(false));
      mockCartService.removeAllCartItems().subscribe({
        complete: () => {
          expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
          expect(mockRouter.navigate).toHaveBeenCalledWith([
            'grocery-store',
            'home',
            'all-products',
          ]);
        },
      });
    });
  });
});
