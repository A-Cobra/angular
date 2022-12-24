import { HamburgerIngredient } from './hamburger-ingredient.type';

const pricesList: Array<{ type: HamburgerIngredient; price: number }> = [
  {
    type: 'meat',
    price: 1.5,
  },
  {
    type: 'cheese',
    price: 0.5,
  },
  {
    type: 'salad',
    price: 0.25,
  },
];

export const ingredientPrice = new Map();
pricesList.forEach(element => {
  ingredientPrice.set(element.type, element.price);
});
