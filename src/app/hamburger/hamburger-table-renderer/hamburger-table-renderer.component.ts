import { Component, Input } from '@angular/core';
import { IngredientController } from 'src/app/models/ingredient-controller.type';
import { ingredientPrice } from 'src/app/models/ingredient-price.map';

@Component({
  selector: 'app-hamburger-table-renderer',
  templateUrl: './hamburger-table-renderer.component.html',
  styleUrls: ['./hamburger-table-renderer.component.scss'],
})
export class HamburgerTableRendererComponent {
  @Input()
  ingredientsController!: Array<IngredientController>;
  ingredientsPricing = ingredientPrice;
  currencyConversionRate: number = 1;
  currencyCode: string = 'USD';
  @Input()
  totalIngredientsControl!: { type: string; units: number; price: number };
  basePrice = 1.0;
  constructor() {}
}
