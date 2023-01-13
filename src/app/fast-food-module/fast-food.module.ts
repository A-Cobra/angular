import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { FastFoodRoutingModule } from './fast-food-routing.module';
import { FastFoodAppComponent } from './containers/fast-food-app/fast-food-app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MyCardDetailsComponent } from './components/my-card-details/my-card-details.component';
import { HamburgerMenuComponent } from './containers/hamburger-menu/hamburger-menu.component';
import { HamburgerDetailsComponent } from './containers/hamburger-details/hamburger-details.component';
import { OrderFormComponent } from './containers/order-form/order-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SingleSelectionComponent } from './components/single-selection/single-selection.component';
import { MultipleSelectionComponent } from './components/multiple-selection/multiple-selection.component';
import { FormTextComponent } from './components/form-text/form-text.component';

@NgModule({
  declarations: [
    FastFoodAppComponent,
    NavigationBarComponent,
    MyCardDetailsComponent,
    HamburgerMenuComponent,
    HamburgerDetailsComponent,
    OrderFormComponent,
    SingleSelectionComponent,
    MultipleSelectionComponent,
    FormTextComponent,
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
