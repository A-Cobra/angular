import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FastFoodRoutingModule } from './fast-food-routing.module';
import { FastFoodAppComponent } from './containers/fast-food-app/fast-food-app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MyCardDetailsComponent } from './components/my-card-details/my-card-details.component';

@NgModule({
  declarations: [
    FastFoodAppComponent,
    NavigationBarComponent,
    MyCardDetailsComponent,
  ],
  imports: [CommonModule, FastFoodRoutingModule],
  exports: [FastFoodAppComponent],
})
export class FastFoodModule {}
