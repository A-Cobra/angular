import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { currencyMap } from 'src/app/models/currency.map';
import { HamburgerIngredientEvent } from 'src/app/models/hamburger-ingredient-event.type';
import { HamburgerIngredient } from 'src/app/models/hamburger-ingredient.type';
import { Hamburger } from 'src/app/models/hamburger.interface';
import { IngredientController } from 'src/app/models/ingredient-controller.type';
import {
  ingredientPrice,
  IngredientPricePair,
} from 'src/app/models/ingredient-price.map';

import { countElementsInList } from 'src/app/utils/count-elements-in-list.function';

@Component({
  selector: 'app-hamburger-interaction-tools',
  templateUrl: './hamburger-interaction-tools.component.html',
  styleUrls: ['./hamburger-interaction-tools.component.scss'],
})
export class HamburgerInteractionToolsComponent
  implements AfterViewInit, OnChanges
{
  totalIngredientsControl!: { type: string; units: number; price: number };
  currencyConversionRate: number = 1;
  currencyCode: string = 'USD';
  currencies = currencyMap;
  ingredientsPricing = ingredientPrice;
  ingredientsKeys = Array.from(ingredientPrice.keys());
  @Input()
  ingredientsController!: Array<IngredientController>;
  @Input()
  currentBurger!: Hamburger;
  @Output()
  childEventEmitter: EventEmitter<HamburgerIngredientEvent> =
    new EventEmitter<HamburgerIngredientEvent>();
  basePrice = 1.0;
  constructor() {
    // console.log('this.ingredientsKeys');
    // console.log(this.ingredientsKeys);
    this.totalIngredientsControl = {
      type: 'Total',
      units: 0,
      price: 0,
    };
  }
  ngAfterViewInit(): void {
    console.log('this.ingredientsController');
    console.log(this.ingredientsController);
    console.log('this.currentBurger');
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.resetTotalIngredientsControl();
    this.ingredientsController.forEach(element => {
      this.totalIngredientsControl.units += element.units;
      this.totalIngredientsControl.price +=
        element.units * this.ingredientsPricing.get(element.type);
    });
  }
  updateCurrency(event: Event | { target: EventTarget | HTMLInputElement }) {
    const value = (event?.target as HTMLInputElement).value;
    this.currencyConversionRate = this.currencies.get(value).conversionRate;
    this.currencyCode = this.currencies.get(value).code;
  }
  hasAtLeastOne(ingredient: HamburgerIngredient) {
    for (const ingredientControl of this.ingredientsController) {
      if (ingredientControl.type === ingredient) {
        if (ingredientControl.units >= 1) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }
  removeEventEmit(ingredient: HamburgerIngredient) {
    this.childEventEmitter.emit({
      type: 'remove',
      ingredient: ingredient,
    });
  }
  addEventEmit(ingredient: HamburgerIngredient) {
    this.childEventEmitter.emit({
      type: 'add',
      ingredient: ingredient,
    });
  }
  resetTotalIngredientsControl() {
    this.totalIngredientsControl = {
      type: 'Total',
      units: 0,
      price: 0,
    };
  }
}
