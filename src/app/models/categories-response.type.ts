import { MetaData } from './meta-data.interface';
import { ProductCategory } from './product-category.interface';

export type CategoriesResponse = {
  data: ProductCategory[];
  meta: MetaData;
};
