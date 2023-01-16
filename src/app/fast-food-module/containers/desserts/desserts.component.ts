import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu-item.interface';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss'],
})
export class DessertsComponent implements OnInit {
  previouslySelectedItemId = -1;
  collapsedCards: boolean[] = [];
  dessertsMenu: MenuItem[] = [];
  category = 3;
  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.menuService.getMenuByCategory(this.category).subscribe({
      next: (menu: MenuItem[]) => {
        this.dessertsMenu = menu;
      },
      complete: () => {
        this.dessertsMenu.forEach((burger: MenuItem, index) => {
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
            'menu-selection': ['desserts'],
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
          'menu-selection': ['desserts'],
          'menu-details': ['selection'],
        },
      },
    ]);
    setTimeout(() => {
      this.router.navigate([
        'fast-food',
        {
          outlets: {
            'menu-selection': ['desserts'],
            'menu-details': ['dessert', id],
          },
        },
      ]);
    });
  }
}
