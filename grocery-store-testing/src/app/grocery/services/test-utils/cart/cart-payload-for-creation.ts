import { CartPayloadForCreation } from 'src/app/models/cart/cart-payload-for-creation.type';

export const cartPayloadForCreation: CartPayloadForCreation = {
  data: {
    items: [
      {
        product_variant_id: 36,
        quantity: 2,
      },
    ],
  },
};
