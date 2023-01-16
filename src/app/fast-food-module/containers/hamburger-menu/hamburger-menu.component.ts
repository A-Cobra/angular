import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu-item.interface';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent implements OnInit {
  previouslySelectedItemId = -1;
  burgerMenu: MenuItem[] = [];
  collapsedCards: boolean[] = [];
  category = 1;
  constructor(private menuService: MenuService, private router: Router) {}
  ngOnInit(): void {
    this.menuService.getMenuByCategory(this.category).subscribe({
      next: (menu: MenuItem[]) => {
        this.burgerMenu = menu;
        console.log(this.burgerMenu);
      },
      complete: () => {
        this.burgerMenu.forEach((burger: MenuItem, index) => {
          this.collapsedCards.unshift(true);
        });

        console.log('Collapsed Cards');
        console.log(this.collapsedCards);
      },
    });
    console.log('object');
    console.log(this.menuService.menuPath);
  }

  // onCardClick(chosenBurger: MenuItem) {
  //   console.log('Card clicked');
  //   console.log(chosenBurger.id);
  //   if (chosenBurger.id === this.selectedBurgerId) {
  //   }
  // }

  onCardClick(id: number, menuItem: MenuItem): void {
    console.log('OK');
    if (this.previouslySelectedItemId === -1) {
      // this.collapsedCards[id] = !this.collapsedCards[id];
      this.previouslySelectedItemId = id;
      // this.redirectToItemDetails(menuItem.id);

      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

      // MIGHT WORK
      this.router.navigate([
        'fast-food',
        {
          outlets: {
            'menu-selection': ['hamburger-combos'],
            'menu-details': ['selection'],
          },
        },
      ]);
      setTimeout(() => {
        this.router.navigate([
          'fast-food',
          {
            outlets: {
              'menu-selection': ['hamburger-combos'],
              'menu-details': ['burger-combo', menuItem.id],
            },
          },
        ]);
      });
      // this.router.navigate([
      //   'fast-food',
      //   {
      //     outlets: {
      //       'menu-selection': ['hamburger-combos'],
      //       'menu-details': ['burger-combo', menuItem.id],
      //     },
      //   },
      // ]);

      // });
    } else if (
      this.previouslySelectedItemId === id &&
      !this.collapsedCards[id]
    ) {
      this.router.navigate([
        'fast-food',
        {
          outlets: {
            'menu-selection': ['hamburger-combos'],
            'menu-details': ['selection'],
          },
        },
      ]);
    } else if (this.previouslySelectedItemId === id) {
      // this.collapsedCards[id] = !this.collapsedCards[id];
      // REDIRECT TO SELECTED BURGER AND UNCOLLAPSE IT
      // this.redirectToItemDetails(menuItem.id);

      // MIGHT WORK
      this.router.navigate([
        'fast-food',
        {
          outlets: {
            'menu-selection': ['hamburger-combos'],
            'menu-details': ['selection'],
          },
        },
      ]);
      setTimeout(() => {
        this.router.navigate([
          'fast-food',
          {
            outlets: {
              'menu-selection': ['hamburger-combos'],
              'menu-details': ['burger-combo', menuItem.id],
            },
          },
        ]);
      });
      // this.router.navigate([
      //   'fast-food',
      //   {
      //     outlets: {
      //       'menu-selection': ['hamburger-combos'],
      //       'menu-details': ['burger-combo', menuItem.id],
      //     },
      //   },
      // ]);

      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //   this.router.navigate([
      //     'fast-food',
      //     {
      //       outlets: {
      //         'menu-selection': ['hamburger-combos'],
      //         'menu-details': ['burger-combo', menuItem.id],
      //       },
      //     },
      //   ]);
      // });
    } else {
      this.collapsedCards[this.previouslySelectedItemId] = true;
      this.previouslySelectedItemId = id;
      // this.redirectToItemDetails(menuItem.id);

      // MIGHT WORK
      this.router.navigate([
        'fast-food',
        {
          outlets: {
            'menu-selection': ['hamburger-combos'],
            'menu-details': ['selection'],
          },
        },
      ]);
      setTimeout(() => {
        this.router.navigate([
          'fast-food',
          {
            outlets: {
              'menu-selection': ['hamburger-combos'],
              'menu-details': ['burger-combo', menuItem.id],
            },
          },
        ]);
      });
      // MIGHT WORK
      // this.router.navigate([
      //   'fast-food',
      //   {
      //     outlets: {
      //       'menu-selection': ['hamburger-combos'],
      //       'menu-details': ['burger-combo', menuItem.id],
      //     },
      //   },
      // ]);
      // WORKS ABOVE

      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //   this.router.navigate([
      //     'fast-food',
      //     {
      //       outlets: {
      //         'menu-selection': ['hamburger-combos'],
      //         'menu-details': ['burger-combo', menuItem.id],
      //       },
      //     },
      //   ]);
      // });
      // this.router.navigate([
      //   'fast-food',
      //   {
      //     outlets: {
      //       'menu-selection': ['hamburger-combos'],
      //       'menu-details': ['burger-combo', menuItem.id],
      //     },
      //   },
      // ]);
    }
    this.collapsedCards[id] = !this.collapsedCards[id];
    // if (
    //   !(
    //     id === this.previouslySelectedBurgerId ||
    //     this.previouslySelectedBurgerId === -1
    //   )
    // ) {
    //   this.collapsedCards[this.previouslySelectedBurgerId] = true;
    // }
    // this.collapsedCards[id] = !this.collapsedCards[id];
    // this.previouslySelectedBurgerId = id;
  }

  redirectToItemDetails(id: number) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([
        'fast-food',
        {
          outlets: {
            'menu-selection': ['hamburger-combos'],
            'menu-details': ['burger-combo', id],
          },
        },
      ]);
    });
  }
}
