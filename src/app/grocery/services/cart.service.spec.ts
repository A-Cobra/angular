import { Observable, of } from 'rxjs';
import { CartData } from 'src/app/models/cart/cart-data.interface';
import { environment } from 'src/environments/environment';
import { CartService } from './cart.service';
import { defaultCartDataResponse } from './test-utils/default-cart-data-response';

describe('CartService Tests', () => {
  let service: CartService;
  let mockHTTPClient: any;
  // {
  //   get: () => Observable<CartData>;
  // };

  beforeEach(() => {
    mockHTTPClient = {
      get: jest.fn(),
    };
    service = new CartService(mockHTTPClient);
  });

  test('that the Service gets instantiated', () => {
    expect(service).toBeTruthy();
  });
  test('the getCartData method', () => {
    const response = defaultCartDataResponse;
    const url = `${environment.applaudoApiBaseUrl}/cart`;
    jest.spyOn(mockHTTPClient, 'get').mockReturnValue(of(response));
    service.getCartData();
    expect(mockHTTPClient.get).toHaveBeenCalledTimes(1);
    expect(mockHTTPClient.get).toHaveBeenCalledWith(url);
  });
});
