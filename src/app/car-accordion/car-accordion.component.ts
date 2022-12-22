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
        collapsed: true,
        content: [
          {
            brand: 'Rimac',
            model: 'Nevera',
            releaseYear: 2021,
            engine: '4WD-Electric',
            weight: 2150,
            price: 2100000,
            logo: '../../assets/images/logos/rimac.svg',
            img: '../../assets/images/cars/Rimac_Nevera.jpg',
          },
          {
            brand: 'DOK-ING',
            model: 'Loox',
            releaseYear: 2010,
            engine: '4WD-Electric',
            weight: 1300,
            price: 35000,
            logo: '../../assets/images/logos/dok-ing.png',
            img: '../../assets/images/cars/dok-ing-loox.jpg',
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
            logo: '../../assets/images/logos/mercedes.jpg',
            img: '../../assets/images/cars/AMG-one.jpg',
          },
          {
            brand: 'Porsche',
            model: '919 Hybrid Evo',
            releaseYear: 2014,
            engine: 'Hybrid V4',
            weight: 849,
            price: 100000,
            logo: '../../assets/images/logos/porsche.jpg',
            img: '../../assets/images/cars/porsche919.jpg',
          },
          {
            brand: 'Apollo',
            model: 'Intensa Emozione',
            releaseYear: 2017,
            engine: 'Naturally Aspirated V12',
            weight: 1250,
            price: 2300000,
            logo: '../../assets/images/logos/Apollo_Automobil_Logo.png',
            img: '../../assets/images/cars/apolloIE.jpg',
          },
          {
            brand: 'Apollo',
            model: 'Project Evo',
            releaseYear: 2022,
            engine: 'Naturally Aspirated V12',
            weight: 1250,
            price: 3000000,
            logo: '../../assets/images/logos/Apollo_Automobil_Logo.png',
            img: '../../assets/images/cars/apolloProjectEvo.jpg',
          },
          {
            brand: 'Volkswagen',
            model: 'I.D.R',
            releaseYear: 2018,
            engine: '4WD-Electric',
            weight: 1100,
            price: null,
            logo: '../../assets/images/logos/Volkswagen_logo_2019.svg',
            img: '../../assets/images/cars/idr.jpg',
          },
        ],
      },
      {
        category: 'American',
        collapsed: true,
        content: [
          {
            brand: 'Ford',
            model: 'GT',
            releaseYear: 2004,
            engine: 'Twin-Turbo V6',
            weight: 1385,
            price: 500000,
            logo: '../../assets/images/logos/ford.png',
            img: '../../assets/images/cars/fordGT.jpg',
          },
          {
            brand: 'Tesla',
            model: 'Model S Plaid',
            releaseYear: 2021,
            engine: '4WD-Electric',
            weight: 2162,
            price: 130000,
            logo: '../../assets/images/logos/Tesla_T_symbol.svg',
            img: '../../assets/images/cars/splaid.jpg',
          },
          {
            brand: 'Czinger',
            model: '21C',
            releaseYear: 2023,
            engine: '4WD-Electric',
            weight: 1250,
            price: 2000000,
            logo: '../../assets/images/logos/czinger.jpg',
            img: '../../assets/images/cars/czinger-21c.jpg',
          },
          {
            brand: 'Hennessey',
            model: 'Venom F5',
            releaseYear: 2022,
            engine: 'Twin-Turbo V8',
            weight: 1360,
            price: 3000000,
            logo: '../../assets/images/logos/hennesseyv2.png',
            img: '../../assets/images/cars/Hennessey-Venom-F5-35.jpg',
          },
        ],
      },
      {
        category: 'Japanese',
        collapsed: true,
        content: [
          {
            brand: 'Nissan',
            model: 'GT-R Nismo',
            releaseYear: 2022,
            engine: 'Twin-Turbo V6',
            weight: 1751,
            price: 115000,
            logo: '../../assets/images/logos/nissan.jpg',
            img: '../../assets/images/cars/gtrNismo.jpg',
          },
          {
            brand: 'Toyota',
            model: 'TS050 Hybrid',
            releaseYear: 2018,
            engine: 'Hybrid V6',
            weight: 878,
            price: 1000000,
            logo: '../../assets/images/logos/toyota.jpg',
            img: '../../assets/images/cars/TS050_Hybrid.jpg',
          },
          {
            brand: 'Subaru',
            model: 'Impreza WRX STI',
            releaseYear: 1999,
            engine: '2.0L Flat 4',
            weight: 1295,
            price: 140000,
            logo: '../../assets/images/logos/subaru.jpg',
            img: '../../assets/images/cars/subaruWrxSti.jpg',
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
