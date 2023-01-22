import { MetaData } from './meta-data.interface';
import { Product } from './product.interface';

export type SingleProductResponse = {
  data: Product;
  meta: MetaData;
};
