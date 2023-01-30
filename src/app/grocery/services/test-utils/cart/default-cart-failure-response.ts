import { CartFailureResponse } from 'src/app/models/cart/cart-failure-response.type';

export const defaultCartFailureResponse: CartFailureResponse = {
  error: {
    errors: [
      {
        field_name: 'items.stock',
        message: 'Not enough stock',
        code: '4e6f7420656e6f7567682073746f636b',
      },
    ],
  },
  headers: '',
  message: '',
  name: '',
  ok: false,
  status: 404,
  statusText: '',
  url: '',
};
