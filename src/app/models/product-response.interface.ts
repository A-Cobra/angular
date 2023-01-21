import { Product } from './product.interface';
import { MetaData } from './meta-data.interface';

export interface ProductResponse {
  data: Product[];
  meta: MetaData;
}
