import { Component, OnInit } from '@angular/core';
import { HamburgerIngredientEvent } from '../models/hamburger-ingredient-event.type';
import { Hamburger } from '../models/hamburger.interface';
import { IngredientController } from '../models/ingredient-controller.type';
import { countElementsInList } from '../utils/count-elements-in-list.function';
import { generateId } from '../utils/generate-id.function';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
})
export class HamburgerComponent {
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
    this.fillTotalIngredientsControl();
    console.log(this.ingredientsControl);
  }
  private fillIngredientsControl() {
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
  private fillTotalIngredientsControl() {
    this.ingredientsControl.forEach(element => {});
  }
  handleAdditionOrRemoval(event: HamburgerIngredientEvent) {
    console.log(event);
    if (event.type === 'remove') {
      const index = this.currentBurger.ingredients.indexOf(event.ingredient);
      console.log(`Index: ${index}`);
      this.currentBurger.ingredients.splice(index, 1);
    }
  }
}
