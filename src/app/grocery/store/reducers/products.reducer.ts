import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/models/product/product.interface';
import { ProductsPageActions } from '../actions/products.action';

export interface ProductState {
  data: Product[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: ProductState = {
  data: [],
  loaded: false,
  loading: false,
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.loadProducts, (state: ProductState): ProductState => {
    return { ...state, loading: true };
  }),
  on(
    ProductsPageActions.loadProductsSuccess,
    (state: ProductState): ProductState => {
      return { ...state, loading: false, loaded: true };
    }
  ),
  on(
    ProductsPageActions.loadProductsFailure,
    (state: ProductState): ProductState => {
      return { ...state, loading: false, loaded: false };
    }
  )
);
