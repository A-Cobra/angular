import { Component } from '@angular/core';
import { CarGarageDisplay } from '../model/car-garage-display.interface';

@Component({
  selector: 'app-car-accordion',
  templateUrl: './car-accordion.component.html',
  styleUrls: ['./car-accordion.component.scss'],
})
export class CarAccordionComponent {
  carsListByCategory: Array<CarGarageDisplay>; //Change this to not any
  constructor() {
    this.carsListByCategory = [
      {
        category: 'Croatian',
        collapsed: false,
        content: [
          {
            brand: 'Rimac',
            model: 'Nevera',
            releaseYear: 2021,
            engine: '4WD-Electric',
            weight: 2150,
            price: 2100000,
            logo: '',
            img: '',
          },
          {
            brand: 'DOK-ING',
            model: 'Loox',
            releaseYear: 2010,
            engine: '4WD-Electric',
            weight: 1300,
            price: 35000,
            logo: '',
            img: '',
          },
        ],
      },
      {
        category: 'German',
        collapsed: true,
        content: [
          {
            brand: 'Mercedes Benz',
            model: 'AMG One',
            releaseYear: 2022,
            engine: 'Hybrid E-turbo V6',
            weight: 1695,
            price: 2100000,
            logo: '',
            img: '',
          },
          {
            brand: 'Porsche',
            model: '919 Hybrid Evo',
            releaseYear: 2014,
            engine: 'Hybrid V4',
            weight: 849,
            price: 100000,
            logo: '',
            img: '',
          },
        ],
      },
    ];
  }
  expandAllCards() {
    this.carsListByCategory.forEach(carCategory => {
      carCategory.collapsed = false;
    });
  }
  collapseAllCards() {
    this.carsListByCategory.forEach(carCategory => {
      carCategory.collapsed = true;
    });
  }
  handleCollapsedStatus(event: string) {
    for (const carCategory of this.carsListByCategory) {
      if (carCategory.category === event) {
        carCategory.collapsed = !carCategory.collapsed;
        break;
      }
    }
  }
}
