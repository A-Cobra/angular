import { Component, OnInit } from '@angular/core';
import { Hamburger } from '../models/hamburger.interface';
import { generateId } from '../utils/generate-id.function';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
})
export class HamburgerComponent {
  hamburgerList: Array<Hamburger> = [
    {
      ingredients: ['top-bread', 'meat', 'salad', 'bottom-bread'],
      id: '123',
    },
    {
      ingredients: [
        'top-bread',
        'meat',
        'salad',
        'cheese',
        'meat',
        'bottom-bread',
      ],
      id: '123',
    },
  ];
  currentBurger!: Hamburger;
  constructor() {
    this.currentBurger = {
      ingredients: ['top-bread', 'bottom-bread'],
      id: generateId(15),
    };
  }
}
