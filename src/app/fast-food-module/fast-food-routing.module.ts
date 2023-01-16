import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDetailsPlaceholderComponent } from './components/menu-details-placeholder/menu-details-placeholder.component';
import { MyCardDetailsComponent } from './components/my-card-details/my-card-details.component';
import { DessertsComponent } from './containers/desserts/desserts.component';
import { FastFoodAppComponent } from './containers/fast-food-app/fast-food-app.component';
import { ItemDetailsComponent } from './containers/item-details/item-details.component';
import { HamburgerMenuComponent } from './containers/hamburger-menu/hamburger-menu.component';
import { PizzaMenuComponent } from './containers/pizza-menu/pizza-menu.component';
import { CartPreviewMenuComponent } from './containers/cart-preview-menu/cart-preview-menu.component';
import { CartItemDetailsComponent } from './containers/cart-item-details/cart-item-details.component';
import { CartDetailsPlaceholderComponent } from './components/cart-details-placeholder/cart-details-placeholder.component';
import { OrderMenuComponent } from './containers/order-menu/order-menu.component';
import { OrderDetailsPlaceholderComponent } from './components/order-details-placeholder/order-details-placeholder.component';
import { OrderDetailsComponent } from './containers/order-details/order-details.component';

const routes: Routes = [
  {
    path: '',
    component: FastFoodAppComponent,
    children: [
      // Main Outlet
      {
        path: 'hamburger-combos',
        outlet: 'menu-selection',
        component: HamburgerMenuComponent,
      },
      {
        path: 'pizza-combos',
        outlet: 'menu-selection',
        component: PizzaMenuComponent,
      },
      {
        path: 'desserts',
        outlet: 'menu-selection',
        component: DessertsComponent,
      },
      {
        path: 'cart',
        outlet: 'menu-selection',
        component: CartPreviewMenuComponent,
      },
      {
        path: 'order',
        outlet: 'menu-selection',
        component: OrderMenuComponent,
      },
      // Secondary Outlet
      {
        path: 'burger-combo/:id',
        outlet: 'menu-details',
        component: ItemDetailsComponent,
      },
      {
        path: 'pizza-combo/:id',
        outlet: 'menu-details',
        component: ItemDetailsComponent,
      },
      {
        path: 'dessert/:id',
        outlet: 'menu-details',
        component: ItemDetailsComponent,
      },
      {
        path: 'cart-item/:id',
        outlet: 'menu-details',
        component: CartItemDetailsComponent,
      },
      {
        path: 'order-item/:id',
        outlet: 'menu-details',
        component: OrderDetailsComponent,
      },
      {
        path: 'selection',
        outlet: 'menu-details',
        component: MenuDetailsPlaceholderComponent,
      },
      {
        path: 'cart-selection',
        outlet: 'menu-details',
        component: CartDetailsPlaceholderComponent,
      },
      {
        path: 'order-selection',
        outlet: 'menu-details',
        component: OrderDetailsPlaceholderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FastFoodRoutingModule {}
