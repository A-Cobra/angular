import { CartPayloadForUpdate } from 'src/app/models/cart/cart-payload-for-update.type';

export const defaultCartPayloadForUpdate: CartPayloadForUpdate = {
  data: {
    items: [
      {
        id: 1107,
        quantity: 3,
      },
    ],
  },
};
