import { Component, OnInit } from '@angular/core';
import { HamburgerIngredientEvent } from '../models/hamburger-ingredient-event.type';
import { Hamburger } from '../models/hamburger.interface';
import { IngredientController } from '../models/ingredient-controller.type';
import { ingredientPrice } from '../models/ingredient-price.map';
import { LocalStorageService } from '../services/local-storage.service';
import { countElementsInList } from '../utils/count-elements-in-list.function';
import { generateId } from '../utils/generate-id.function';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
})
export class HamburgerComponent {
  orderSuccess: boolean;
  defaultBurger: Hamburger = {
    ingredients: ['top-bread', 'bottom-bread'],
    id: generateId(15),
  };
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
  hamburgerOrderHistory: Array<Hamburger> = [];
  currentBurger!: Hamburger;
  ingredientsPricing = ingredientPrice;
  constructor(private lsService: LocalStorageService) {
    this.orderSuccess = false;
    this.ingredientsControl = [];
    this.fillHamburgerOrderHistory();
    this.fillCurrentBurger();
    this.fillIngredientsControl();
    this.refillTotalIngredientsControl();
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
    this.lsService.put('currentBurger', JSON.stringify(this.currentBurger));
  }
  handleOrder(event: string) {
    if (event === 'order') {
      console.log('Processing Order');
      this.currentBurger.id = generateId(15);
      this.defaultBurger.id = generateId(15);
      this.hamburgerOrderHistory.unshift(this.currentBurger);
      this.lsService.put('currentBurger', JSON.stringify(this.defaultBurger));
      this.lsService.put(
        'hamburgerOrderHistory',
        JSON.stringify(this.hamburgerOrderHistory)
      );
      this.orderSuccess = true;
      setTimeout(() => {
        this.orderSuccess = false;
      }, 2500);
      this.fillAllObjectsAndArrays();
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
  fillCurrentBurger() {
    const response = this.lsService.get('currentBurger');
    if (response !== null) {
      this.currentBurger = response;
    } else {
      this.currentBurger = Object.assign({}, this.defaultBurger);
    }
  }
  fillHamburgerOrderHistory() {
    const response = this.lsService.get('hamburgerOrderHistory');
    if (response !== null) {
      this.hamburgerOrderHistory = response;
    } else {
      this.hamburgerOrderHistory = [];
    }
    console.log('this.hamburgerOrderHistory');
    console.log(this.hamburgerOrderHistory);
  }
  fillAllObjectsAndArrays() {
    this.fillCurrentBurger();
    this.fillIngredientsControl();
    this.refillTotalIngredientsControl();
  }
}
