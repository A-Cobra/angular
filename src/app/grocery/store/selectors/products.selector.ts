import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ProductState } from '../reducers/products.reducer';

export const selectStore = createFeatureSelector<AppState>('state-store');
export const selectProducts = createFeatureSelector<ProductState>('products');

export const selectFeatureProducts = createSelector(
  selectStore,
  state => state.products
);

export const selectProductsArray = createSelector(
  selectFeatureProducts,
  (products: ProductState) => products.data
);

export const selectProductsLoading = createSelector(
  selectFeatureProducts,
  (products: ProductState) => products.loading
);
