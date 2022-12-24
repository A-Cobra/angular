import { Component, OnInit } from '@angular/core';
import { HamburgerIngredientEvent } from '../models/hamburger-ingredient-event.type';
import { Hamburger } from '../models/hamburger.interface';
import { IngredientController } from '../models/ingredient-controller.type';
import { ingredientPrice } from '../models/ingredient-price.map';
import { countElementsInList } from '../utils/count-elements-in-list.function';
import { generateId } from '../utils/generate-id.function';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
})
export class HamburgerComponent {
  totalIngredientsControl!: { type: string; units: number; price: number };
  ingredientsControl: Array<IngredientController>;
  hamburgerList: Array<Hamburger> = [
    {
      ingredients: ['top-bread', 'meat', 'lettuce', 'bottom-bread'],
      id: '123',
    },
    {
      ingredients: [
        'top-bread',
        'meat',
        'lettuce',
        'tomato',
        'cheese',
        'meat',
        'bottom-bread',
      ],
      id: '123',
    },
  ];
  currentBurger!: Hamburger;
  ingredientsPricing = ingredientPrice;
  constructor() {
    this.ingredientsControl = [];
    this.currentBurger = {
      ingredients: [
        // 'top-bread',
        // 'bottom-bread',
        'top-bread',
        'cheese',
        'meat',
        'tomato',
        'lettuce',
        'cheese',
        'meat',
        'bottom-bread',
      ],
      id: generateId(15),
    };
    this.fillIngredientsControl();
    this.refillTotalIngredientsControl();
    console.log(this.ingredientsControl);
  }
  private fillIngredientsControl() {
    this.ingredientsControl = [];
    for (const ingredient of this.currentBurger.ingredients.slice(
      1,
      this.currentBurger.ingredients.length - 1
    )) {
      let breakOuterLoop = false;
      if (this.ingredientsControl.length > 1) {
        for (const ingredientControl of this.ingredientsControl) {
          if (ingredientControl.type === ingredient) {
            breakOuterLoop = true;
            continue;
          }
        }
      }
      if (!breakOuterLoop) {
        this.ingredientsControl.push({
          type: ingredient,
          units: countElementsInList(
            this.currentBurger.ingredients,
            ingredient
          ),
        });
      }
    }
  }
  handleAdditionOrRemoval(event: HamburgerIngredientEvent) {
    console.log(event);
    if (event.type === 'remove') {
      const index = this.currentBurger.ingredients.indexOf(event.ingredient);
      console.log(`Index: ${index}`);
      this.currentBurger.ingredients.splice(index, 1);
      this.fillIngredientsControl();
      this.refillTotalIngredientsControl();
    } else {
      this.currentBurger.ingredients.splice(1, 0, event.ingredient);
      this.fillIngredientsControl();
      this.refillTotalIngredientsControl();
    }
  }
  resetTotalIngredientsControl() {
    this.totalIngredientsControl = {
      type: 'Total',
      units: 0,
      price: 0,
    };
  }
  refillTotalIngredientsControl() {
    this.resetTotalIngredientsControl();
    this.ingredientsControl.forEach(element => {
      this.totalIngredientsControl.units += element.units;
      this.totalIngredientsControl.price +=
        element.units * this.ingredientsPricing.get(element.type);
    });
  }
}
