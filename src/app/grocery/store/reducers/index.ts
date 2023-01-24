import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../app.state';
import { productsReducer } from './products.reducer';

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer,
};
