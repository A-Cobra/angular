import { HamburgerIngredient } from './hamburger-ingredient.type';

export type HamburgerIngredientEvent = {
  type: 'remove' | 'add';
  ingredient: HamburgerIngredient;
};
