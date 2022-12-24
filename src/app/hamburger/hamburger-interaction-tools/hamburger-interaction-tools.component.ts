import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { currencyMap } from 'src/app/models/currency.map';
import { HamburgerIngredient } from 'src/app/models/hamburger-ingredient.type';
import { Hamburger } from 'src/app/models/hamburger.interface';
import { IngredientController } from 'src/app/models/ingredient-controller.type';
import { ingredientPrice } from 'src/app/models/ingredient-price.map';

import { countElementsInList } from 'src/app/utils/count-elements-in-list.function';

@Component({
  selector: 'app-hamburger-interaction-tools',
  templateUrl: './hamburger-interaction-tools.component.html',
  styleUrls: ['./hamburger-interaction-tools.component.scss'],
})
export class HamburgerInteractionToolsComponent
  implements AfterViewInit, OnChanges
{
  conversionRate: number = 1;
  currencies = currencyMap;
  ingredientsPricing = ingredientPrice;
  meatUnits!: number;
  cheeseUnits!: number;
  saladUnits!: number;
  @Input()
  ingredientsController!: Array<IngredientController>;
  @Input()
  currentBurger!: Hamburger;
  basePrice = 1.0;
  constructor() {}
  ngAfterViewInit(): void {
    console.log('this.currentBurger');
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.meatUnits = countElementsInList(
      this.currentBurger.ingredients,
      'meat'
    );
    this.cheeseUnits = countElementsInList(
      this.currentBurger.ingredients,
      'cheese'
    );
    this.saladUnits = countElementsInList(
      this.currentBurger.ingredients,
      'salad'
    );
  }
  updateCurrency(event: Event | { target: EventTarget }) {
    this.conversionRate = Number((event.target as HTMLInputElement).value);
    console.log((event.target as HTMLInputElement).value);
  }
}
