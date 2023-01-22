import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroceryRoutingModule } from './grocery-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './containers/home/home.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ProductVisualizerComponent } from './components/product-visualizer/product-visualizer.component';
import { AllProductsComponent } from './containers/all-products/all-products.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    NavigationBarComponent,
    ProductVisualizerComponent,
    AllProductsComponent,
  ],
  imports: [CommonModule, GroceryRoutingModule, ReactiveFormsModule],
  providers: [],
})
export class GroceryModule {}
