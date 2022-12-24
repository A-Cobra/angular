import { IngredientPricePair } from './ingredient-price.map';

export type HamburgerIngredient =
  | keyof typeof IngredientPricePair
  | 'bottom-bread'
  | 'top-bread';
