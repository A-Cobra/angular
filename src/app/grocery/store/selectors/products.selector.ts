import { createSelector } from '@ngrx/store';
import { AppState } from '../models/store-state.interface';

export const selectProducts = createSelector(
  (state: AppState) => state,
  originalState => originalState.products
);
