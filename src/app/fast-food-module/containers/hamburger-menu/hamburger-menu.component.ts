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
      },
      complete: () => {
        this.burgerMenu.forEach((burger: MenuItem, index) => {
          this.collapsedCards.unshift(true);
        });
      },
    });
  }

  onCardClick(id: number, menuItem: MenuItem): void {
    if (this.previouslySelectedItemId === -1) {
      this.previouslySelectedItemId = id;
      this.navigateToItemWithId(menuItem.id);
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
      this.navigateToItemWithId(menuItem.id);
    } else {
      this.collapsedCards[this.previouslySelectedItemId] = true;
      this.previouslySelectedItemId = id;
      this.navigateToItemWithId(menuItem.id);
    }
    this.collapsedCards[id] = !this.collapsedCards[id];
  }

  navigateToItemWithId(id: number) {
    this.router.navigate([
      'fast-food',
      {
        outlets: {
          'menu-selection': ['hamburger-combos'],
          'menu-details': ['burger-combo', id],
        },
      },
    ]);
  }
}
