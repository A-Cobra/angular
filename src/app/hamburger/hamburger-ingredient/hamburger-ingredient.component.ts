import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hamburger-ingredient',
  templateUrl: './hamburger-ingredient.component.html',
  styleUrls: ['./hamburger-ingredient.component.scss'],
})
export class HamburgerIngredientComponent {
  @Input()
  type: string = '';
  constructor() {}
}
