import { of, throwError } from 'rxjs';
import { CartData } from 'src/app/models/cart/cart-data.interface';
import { CartItem } from 'src/app/models/cart/cart-item.interface';
import { CartPayloadForCreation } from 'src/app/models/cart/cart-payload-for-creation.type';
import { environment } from 'src/environments/environment';
import { CartService } from './cart.service';
import { defaultCartDataResponse } from '../test-utils/cart/default-cart-data-response';
import { cartPayloadForCreation } from '../test-utils/cart/cart-payload-for-creation';
import { CartItemsResponse } from 'src/app/models/cart/cart-items-response.type';
import { defaultMetaData } from '../test-utils/cart/default-meta';
import { CartPayloadForRemoval } from 'src/app/models/cart/cart-payload-for-removal.type';
import { defaultCartPayloadForRemoval } from '../test-utils/cart/cart-payload-for-removal';
import {
  CartFailureResponse,
  ErrorContainer,
} from 'src/app/models/cart/cart-failure-response.type';
import { defaultCartFailureResponse } from '../test-utils/cart/default-cart-failure-response';
import { CartPayloadForUpdate } from 'src/app/models/cart/cart-payload-for-update.type';
import { defaultCartPayloadForUpdate } from '../test-utils/cart/default-payload-for-update';

describe('CartService Tests', () => {
  let service: CartService;
  let mockHTTPClient: any;
  // {
  //   get: () => Observable<CartData>;
  // };

  beforeEach(() => {
    mockHTTPClient = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };
    service = new CartService(mockHTTPClient);
  });

  test('that the Service gets instantiated', () => {
    expect(service).toBeTruthy();
  });
  // GET CART DATA
  test('the getCartData method', () => {
    const response: CartItemsResponse = {
      data: defaultCartDataResponse,
      meta: defaultMetaData,
    };
    const url = `${environment.applaudoApiBaseUrl}/cart`;
    jest.spyOn(mockHTTPClient, 'get').mockReturnValue(of(response));
    service.getCartData().subscribe({
      next: (cartData: CartData) => {
        expect(response.data).toEqual(cartData);
      },
    });
    expect(mockHTTPClient.get).toHaveBeenCalledTimes(1);
    expect(mockHTTPClient.get).toHaveBeenCalledWith(url);
  });
  // GET CART ITEMS
  test('the getCartItems method', () => {
    const response = defaultCartDataResponse.items;
    const url = `${environment.applaudoApiBaseUrl}/cart`;
    jest.spyOn(mockHTTPClient, 'get').mockReturnValue(of(response));
    service.getCartItems().subscribe({
      next: (cartItems: CartItem[]) => {
        expect(response).toEqual(cartItems);
      },
    });
    expect(mockHTTPClient.get).toHaveBeenCalledTimes(1);
    expect(mockHTTPClient.get).toHaveBeenCalledWith(url);
  });
  test('the addItemToCart method success response', () => {
    // const response = defaultCartDataResponse.items;
    const response = defaultCartDataResponse;
    const url = `${environment.applaudoApiBaseUrl}/cart`;
    const payload: CartPayloadForCreation = cartPayloadForCreation;
    jest.spyOn(mockHTTPClient, 'post').mockReturnValue(of(response));
    service.addItemToCart(payload).subscribe({
      next: (cartItems: CartItem[]) => {
        expect(response).toEqual(cartItems);
      },
    });
    expect(mockHTTPClient.post).toHaveBeenCalledTimes(1);
    expect(mockHTTPClient.post).toHaveBeenCalledWith(url, payload);
  });
  test('the addItemToCart method failure response', () => {
    const response = '4e6f7420656e6f7567682073746f636b';
    const url = `${environment.applaudoApiBaseUrl}/cart`;
    const payload: CartPayloadForCreation = cartPayloadForCreation;
    // jest.spyOn(mockHTTPClient, 'post').mockReturnValue(of(Error(response)));
    jest
      .spyOn(mockHTTPClient, 'post')
      .mockReturnValue(throwError(() => response));
    service.addItemToCart(payload).subscribe({
      error: (error: Error) => {
        expect(response).toBe(error);
      },
    });
    expect(mockHTTPClient.post).toHaveBeenCalledTimes(1);
    expect(mockHTTPClient.post).toHaveBeenCalledWith(url, payload);
  });
  // REMOVE ITEM FROM CART
  test('the removeItemFromCart method success', () => {
    const response: CartItemsResponse = {
      data: defaultCartDataResponse,
      meta: defaultMetaData,
    };
    const url = `${environment.applaudoApiBaseUrl}/cart`;
    const payload: CartPayloadForRemoval = defaultCartPayloadForRemoval;
    jest.spyOn(mockHTTPClient, 'put').mockReturnValue(of(response));
    service.removeItemFromCart(payload).subscribe({
      next: (cartData: CartData) => {
        expect(response.data).toEqual(cartData);
      },
    });
    expect(mockHTTPClient.put).toHaveBeenCalledTimes(1);
    expect(mockHTTPClient.put).toHaveBeenCalledWith(url, payload);
  });
  test('the removeItemFromCart method failure', () => {
    const response: CartFailureResponse = defaultCartFailureResponse;
    const url = `${environment.applaudoApiBaseUrl}/cart`;
    const payload: CartPayloadForRemoval = defaultCartPayloadForRemoval;
    jest
      .spyOn(mockHTTPClient, 'put')
      .mockReturnValue(throwError(() => response.error.errors[0].code));
    service.removeItemFromCart(payload).subscribe({
      error: (error: Error) => {
        expect(response.error.errors[0].code).toBe(error.message);
      },
    });
    expect(mockHTTPClient.put).toHaveBeenCalledTimes(1);
    expect(mockHTTPClient.put).toHaveBeenCalledWith(url, payload);
  });
  // UPDATE ITEM FROM CART
  test('the updateItemQuantity method success', () => {
    const response: CartItemsResponse = {
      data: defaultCartDataResponse,
      meta: defaultMetaData,
    };
    const url = `${environment.applaudoApiBaseUrl}/cart`;
    const payload: CartPayloadForUpdate = defaultCartPayloadForUpdate;
    jest.spyOn(mockHTTPClient, 'put').mockReturnValue(of(response));
    service.updateItemQuantity(payload).subscribe({
      next: (cartData: CartData) => {
        expect(response.data).toEqual(cartData);
      },
    });
    expect(mockHTTPClient.put).toHaveBeenCalledTimes(1);
    expect(mockHTTPClient.put).toHaveBeenCalledWith(url, payload);
  });
  test('the updateItemQuantity method failure', () => {
    const response: CartFailureResponse = defaultCartFailureResponse;
    const url = `${environment.applaudoApiBaseUrl}/cart`;
    const payload: CartPayloadForUpdate = defaultCartPayloadForUpdate;
    jest
      .spyOn(mockHTTPClient, 'put')
      .mockReturnValue(throwError(() => response.error.errors[0].code));
    service.updateItemQuantity(payload).subscribe({
      error: (error: Error) => {
        expect(response.error.errors[0].code).toBe(error.message);
      },
    });
    expect(mockHTTPClient.put).toHaveBeenCalledTimes(1);
    expect(mockHTTPClient.put).toHaveBeenCalledWith(url, payload);
  });
  //REMOVE ALL CART ITEMS
  test('the removeAllCartItems method success', () => {
    const response = true;
    const url = `${environment.applaudoApiBaseUrl}/cart`;
    jest.spyOn(mockHTTPClient, 'delete').mockReturnValue(of(null));
    service.removeAllCartItems().subscribe({
      next: (success: boolean) => {
        expect(response).toEqual(success);
      },
    });
    expect(mockHTTPClient.delete).toHaveBeenCalledTimes(1);
    expect(mockHTTPClient.delete).toHaveBeenCalledWith(url);
  });
  test('the removeAllCartItems method failure', () => {
    const response: ErrorContainer = {
      errors: [
        {
          field_name: 'base',
          message: 'Resource not found',
          code: '404',
        },
      ],
    };
    const url = `${environment.applaudoApiBaseUrl}/cart`;
    jest
      .spyOn(mockHTTPClient, 'delete')
      .mockReturnValue(throwError(() => response));
    service.removeAllCartItems().subscribe({
      next: (success: boolean) => {
        expect(success).toBe(false);
      },
    });
    expect(mockHTTPClient.delete).toHaveBeenCalledTimes(1);
    expect(mockHTTPClient.delete).toHaveBeenCalledWith(url);
  });
});
