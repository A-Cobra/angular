import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu-item.interface';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-pizza-menu',
  templateUrl: './pizza-menu.component.html',
  styleUrls: ['./pizza-menu.component.scss'],
})
export class PizzaMenuComponent implements OnInit {
  pizzaMenu: MenuItem[] = [];
  category = 2;
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService
      .getMenuByCategory(this.category)
      .subscribe((menu: MenuItem[]) => {
        this.pizzaMenu = menu;
        console.log(this.pizzaMenu);
      });
    console.log('object');
    console.log(this.menuService.menuPath);
  }
}
