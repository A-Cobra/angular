import {
  Component,
  EventEmitter,
  Input,
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

@Component({
  selector: 'app-hamburger-interaction-tools',
  templateUrl: './hamburger-interaction-tools.component.html',
  styleUrls: ['./hamburger-interaction-tools.component.scss'],
})
export class HamburgerInteractionToolsComponent {
  @Input()
  totalIngredientsControl!: { type: string; units: number; price: number };
  @Input()
  ingredientsController!: Array<IngredientController>;
  @Input()
  currentBurger!: Hamburger;
  @Output()
  childEventEmitter: EventEmitter<HamburgerIngredientEvent> =
    new EventEmitter<HamburgerIngredientEvent>();
  @Output()
  otherEventEmitter: EventEmitter<string> = new EventEmitter<string>();
  currencyConversionRate: number = 1;
  currencyCode: string = 'USD';
  currencies = currencyMap;
  ingredientsPricing = ingredientPrice;
  ingredientsKeys = Array.from(ingredientPrice.keys());
  basePrice = 1.0;
  constructor() {}
  updateCurrency(event: Event | { target: EventTarget | HTMLInputElement }) {
    const value = (event?.target as HTMLInputElement).value;
    this.currencyConversionRate = (
      this.currencies.get(value) as {
        code: string;
        conversionRate: number;
      }
    ).conversionRate;
    this.currencyCode = (
      this.currencies.get(value) as {
        code: string;
        conversionRate: number;
      }
    ).code;
  }
  hasAtLeastOne(ingredient: HamburgerIngredient | string) {
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
  removeEventEmit(ingredient: HamburgerIngredient | string) {
    this.childEventEmitter.emit({
      type: 'remove',
      ingredient: ingredient as HamburgerIngredient,
    });
  }
  addEventEmit(ingredient: HamburgerIngredient | string) {
    this.childEventEmitter.emit({
      type: 'add',
      ingredient: ingredient as HamburgerIngredient,
    });
  }
  orderEventEmit() {
    this.otherEventEmitter.emit('order');
  }
}
