import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ProductState } from '../reducers/products.reducer';

// export const selectProducts = createSelector(
//   (state: AppState) => state,
//   (originalState: AppState) => originalState.products
// );

export const selectStore = createFeatureSelector<AppState>('state-store');
export const selectProducts = createFeatureSelector<ProductState>('products');
// export const selectStore = (appState: AppState) => appState;

export const selectFeatureProducts = createSelector(
  selectStore,
  state => state.products
);
// export const selectProducts = (state: AppState) => state.products;

// export const selectProducts = createSelector(
//   (appState: AppState) => appState.products
// );

export const selectProductsArray = createSelector(
  selectFeatureProducts,
  (products: ProductState) => products.data
);

export const selectProductsLoading = createSelector(
  selectFeatureProducts,
  (products: ProductState) => products.loading
);
