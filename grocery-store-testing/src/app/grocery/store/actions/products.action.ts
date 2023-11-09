import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from 'src/app/models/product/product.interface';

//Load products
export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Load Products': emptyProps(),
    'Load Products Failure': props<{ error: any }>(),
    'Load Products Success': props<{ products: Product[] }>(),
  },
});
