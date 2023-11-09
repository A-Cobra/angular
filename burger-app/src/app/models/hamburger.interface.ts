import { HamburgerIngredient } from './hamburger-ingredient.type';

export interface Hamburger {
  ingredients: Array<HamburgerIngredient>;
  id: string;
}
