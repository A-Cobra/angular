import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu-item.interface';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss'],
})
export class DessertsComponent implements OnInit {
  dessertsMenu: MenuItem[] = [];
  category = 3;
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService
      .getMenuByCategory(this.category)
      .subscribe((menu: MenuItem[]) => {
        this.dessertsMenu = menu;
      });
  }
}
