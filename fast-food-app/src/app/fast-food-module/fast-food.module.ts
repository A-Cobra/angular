import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { FastFoodRoutingModule } from './fast-food-routing.module';
import { FastFoodAppComponent } from './containers/fast-food-app/fast-food-app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MyCardDetailsComponent } from './components/my-card-details/my-card-details.component';
import { HamburgerMenuComponent } from './containers/hamburger-menu/hamburger-menu.component';
import { ItemDetailsComponent } from './containers/item-details/item-details.component';
import { OrderFormComponent } from './containers/order-form/order-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SingleSelectionComponent } from './components/single-selection/single-selection.component';
import { MultipleSelectionComponent } from './components/multiple-selection/multiple-selection.component';
import { FormTextComponent } from './components/form-text/form-text.component';
import { MenuSelectionHeaderComponent } from './components/menu-selection-header/menu-selection-header.component';
import { PizzaMenuComponent } from './containers/pizza-menu/pizza-menu.component';
import { DessertsComponent } from './containers/desserts/desserts.component';
import { MenuDetailsPlaceholderComponent } from './components/menu-details-placeholder/menu-details-placeholder.component';
import { MenuSelectionContentComponent } from './components/menu-selection-content/menu-selection-content.component';
import { CartPreviewMenuComponent } from './containers/cart-preview-menu/cart-preview-menu.component';
import { CartSelectionDetailsComponent } from './components/cart-selection-content/cart-selection-content.component';
import { CartItemDetailsComponent } from './containers/cart-item-details/cart-item-details.component';
import { CartDetailsPlaceholderComponent } from './components/cart-details-placeholder/cart-details-placeholder.component';
import { OrderMenuComponent } from './containers/order-menu/order-menu.component';
import { OrderDetailsPlaceholderComponent } from './components/order-details-placeholder/order-details-placeholder.component';
import { OrderSelectionOrderComponent } from './components/order-selection-header/order-selection-header.component';
import { OrderSelectionContentComponent } from './components/order-selection-content/order-selection-content.component';
import { OrderDetailsComponent } from './containers/order-details/order-details.component';

@NgModule({
  declarations: [
    FastFoodAppComponent,
    NavigationBarComponent,
    MyCardDetailsComponent,
    HamburgerMenuComponent,
    ItemDetailsComponent,
    OrderFormComponent,
    SingleSelectionComponent,
    MultipleSelectionComponent,
    FormTextComponent,
    MenuSelectionHeaderComponent,
    PizzaMenuComponent,
    DessertsComponent,
    MenuDetailsPlaceholderComponent,
    MenuSelectionContentComponent,
    CartPreviewMenuComponent,
    CartSelectionDetailsComponent,
    CartItemDetailsComponent,
    CartDetailsPlaceholderComponent,
    OrderMenuComponent,
    OrderDetailsPlaceholderComponent,
    OrderSelectionOrderComponent,
    OrderSelectionContentComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    FastFoodRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [FastFoodAppComponent],
})
export class FastFoodModule {}
