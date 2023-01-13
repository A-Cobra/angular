import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { FastFoodRoutingModule } from './fast-food-routing.module';
import { FastFoodAppComponent } from './containers/fast-food-app/fast-food-app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MyCardDetailsComponent } from './components/my-card-details/my-card-details.component';
import { HamburgerMenuComponent } from './containers/hamburger-menu/hamburger-menu.component';

@NgModule({
  declarations: [
    FastFoodAppComponent,
    NavigationBarComponent,
    MyCardDetailsComponent,
    HamburgerMenuComponent,
  ],
  imports: [CommonModule, FastFoodRoutingModule, HttpClientModule],
  exports: [FastFoodAppComponent],
})
export class FastFoodModule {}
