import { MetaData } from '../meta-data.interface';
import { CartData } from './cart-data.interface';

export type CartItemsResponse = {
  data: CartData;
  meta: MetaData;
};
