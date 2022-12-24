import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
    console.log(this.currentBurger);
    console.log('this.ingredientsController');
    console.log(this.ingredientsController);
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
  getPrice(type: HamburgerIngredient, units: number) {
    // return
    // let price: number = 0;
    // for (const ingredientPricePair of this.ingredientsPrice) {
    //   if (type === ingredientPricePair.type) {
    //     price = ingredientPricePair.price;
    //   }
    // }
    // return price * units;
  }
}
