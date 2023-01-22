import { Product } from './product.interface';
import { MetaData } from '../meta-data.interface';

export interface ProductsResponse {
  data: Product[];
  meta: MetaData;
}
