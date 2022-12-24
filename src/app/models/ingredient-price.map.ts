import { HamburgerIngredient } from './hamburger-ingredient.type';

export enum IngredientPricePair {
  meat = 1.5,
  cheese = 0.5,
  salad = 0.25,
}
type Ingredient = keyof typeof IngredientPricePair;
export const ingredientPrice = new Map();
for (const key of Object.keys(IngredientPricePair)) {
  key as string;
  ingredientPrice.set(key as string, IngredientPricePair[key as Ingredient]);
}
