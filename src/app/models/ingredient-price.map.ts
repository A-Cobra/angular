import { HamburgerIngredient } from './hamburger-ingredient.type';

export enum IngredientPricePair {
  meat = 1.5,
  cheese = 0.5,
  lettuce = 0.25,
  tomato = 0.23,
}
type Ingredient = keyof typeof IngredientPricePair;
export const ingredientPrice = new Map();
const ingredientKeys = Object.keys(IngredientPricePair).filter(x =>
  isNaN(parseFloat(x))
);
for (const key of ingredientKeys) {
  key as string;
  ingredientPrice.set(key as string, IngredientPricePair[key as Ingredient]);
}
