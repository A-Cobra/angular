import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { currencyMap } from 'src/app/models/currency.map';
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
  totalIngredientsControl!: { type: string; units: number; price: number };
  currencyConversionRate: number = 1;
  currencyCode: string = 'USD';
  currencies = currencyMap;
  ingredientsPricing = ingredientPrice;
  @Input()
  ingredientsController!: Array<IngredientController>;
  @Input()
  currentBurger!: Hamburger;
  basePrice = 1.0;
  constructor() {
    this.totalIngredientsControl = {
      type: 'Total',
      units: 0,
      price: 0,
    };
  }
  ngAfterViewInit(): void {
    console.log('this.currentBurger');
  }
  ngOnChanges(changes: SimpleChanges): void {
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
}
