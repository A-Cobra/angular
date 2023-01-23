import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../models/store-state.interface';
import { productsReducer } from './products.reducer';

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer,
};
