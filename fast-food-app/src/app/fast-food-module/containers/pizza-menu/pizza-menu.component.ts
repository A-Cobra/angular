import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu-item.interface';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-pizza-menu',
  templateUrl: './pizza-menu.component.html',
  styleUrls: ['./pizza-menu.component.scss'],
})
export class PizzaMenuComponent implements OnInit {
  previouslySelectedItemId = -1;
  collapsedCards: boolean[] = [];
  pizzaMenu: MenuItem[] = [];
  category = 2;

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.menuService.getMenuByCategory(this.category).subscribe({
      next: (menu: MenuItem[]) => {
        this.pizzaMenu = menu;
      },
      complete: () => {
        this.pizzaMenu.forEach((burger: MenuItem, index) => {
          this.collapsedCards.unshift(true);
        });
      },
    });
  }

  onCardClick(id: number, menuItem: MenuItem): void {
    if (this.previouslySelectedItemId === -1) {
      this.previouslySelectedItemId = id;
      this.simulateRedirectionToItemDetails(menuItem.id);
    } else if (
      this.previouslySelectedItemId === id &&
      !this.collapsedCards[id]
    ) {
      this.router.navigate([
        'fast-food',
        {
          outlets: {
            'menu-selection': ['pizza-combos'],
            'menu-details': ['selection'],
          },
        },
      ]);
    } else if (this.previouslySelectedItemId === id) {
      this.simulateRedirectionToItemDetails(menuItem.id);
    } else {
      this.collapsedCards[this.previouslySelectedItemId] = true;
      this.previouslySelectedItemId = id;
      this.simulateRedirectionToItemDetails(menuItem.id);
    }
    this.collapsedCards[id] = !this.collapsedCards[id];
  }

  simulateRedirectionToItemDetails(id: number) {
    this.router.navigate([
      'fast-food',
      {
        outlets: {
          'menu-selection': ['pizza-combos'],
          'menu-details': ['selection'],
        },
      },
    ]);
    setTimeout(() => {
      this.router.navigate([
        'fast-food',
        {
          outlets: {
            'menu-selection': ['pizza-combos'],
            'menu-details': ['pizza-combo', id],
          },
        },
      ]);
    });
  }
}
