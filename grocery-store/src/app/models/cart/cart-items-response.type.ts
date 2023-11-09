import { MetaData } from '../meta-data.interface';
import { CartData } from './cart-data.interface';
import { CartItem } from './cart-item.interface';

export type CartItemsResponse = {
  data: CartData;
  meta: MetaData;
};
