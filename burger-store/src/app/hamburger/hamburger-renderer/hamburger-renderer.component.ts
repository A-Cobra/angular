import { Component, Input } from '@angular/core';
import { Hamburger } from 'src/app/models/hamburger.interface';
import { IngredientController } from 'src/app/models/ingredient-controller.type';

@Component({
  selector: 'app-hamburger-renderer',
  templateUrl: './hamburger-renderer.component.html',
  styleUrls: ['./hamburger-renderer.component.scss'],
})
export class HamburgerRendererComponent {
  @Input()
  currentBurger!: Hamburger;
  constructor() {}
}
