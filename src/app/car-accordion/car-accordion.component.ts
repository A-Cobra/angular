import { Component } from '@angular/core';

@Component({
  selector: 'app-car-accordion',
  templateUrl: './car-accordion.component.html',
  styleUrls: ['./car-accordion.component.scss'],
})
export class CarAccordionComponent {
  carsListByCategory: Array<any>; //Change this to not any
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
          },
          {
            brand: 'DOK-ING',
            model: 'Loox',
            releaseYear: 2010,
            engine: '4WD-Electric',
            weight: 1300,
            price: 35000,
            logo: '',
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
          },
          {
            brand: 'Porsche',
            model: '919 Hybrid Evo',
            releaseYear: 2014,
            engine: 'Hybrid V4',
            weight: 849,
            price: 100000,
            logo: '',
          },
        ],
      },
    ];
  }
  openAllCards() {
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
