import { CartPayloadForRemoval } from 'src/app/models/cart/cart-payload-for-removal.type';

export const defaultCartPayloadForRemoval: CartPayloadForRemoval = {
  data: {
    items: [
      {
        id: 1107,
        _destroy: true,
      },
    ],
  },
};
