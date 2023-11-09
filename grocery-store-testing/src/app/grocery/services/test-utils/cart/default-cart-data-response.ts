import { CartData } from 'src/app/models/cart/cart-data.interface';

export const defaultCartDataResponse: CartData = {
  id: 404,
  user_id: 3,
  number: 372,
  status: 'cart',
  total: '34.16',
  total_items: '34.16',
  created_at: '2023-01-18T20:56:32.024Z',
  items: [
    {
      id: 1105,
      quantity: 1,
      product_variant_id: 35,
      product_id: 35,
      order_id: 404,
      total: '11.69',
      price: '11.69',
      name: 'Zeza',
      description: 'Chewy Candy',
      promotion: 0,
    },
    {
      id: 1106,
      quantity: 1,
      product_variant_id: 33,
      product_id: 33,
      order_id: 404,
      total: '3.17',
      price: '3.17',
      name: 'Sour Patch Kids',
      description: 'Sour Candy',
      promotion: 0,
    },
    {
      id: 1107,
      quantity: 2,
      product_variant_id: 36,
      product_id: 36,
      order_id: 404,
      total: '19.3',
      price: '9.65',
      name: 'Hi-Chew',
      description: 'Chewy Candy',
      promotion: 0,
    },
  ],
};