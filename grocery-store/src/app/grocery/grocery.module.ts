import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroceryRoutingModule } from './grocery-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './containers/home/home.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ProductVisualizerComponent } from './components/product-visualizer/product-visualizer.component';
import { AllProductsComponent } from './containers/all-products/all-products.component';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';
import { SearchingToolsComponent } from './components/searching-tools/searching-tools.component';
import { CartComponent } from './containers/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

//AngularNGRX
import { StoreModule } from '@ngrx/store';

import { reducers } from './store';
import { AuthGuard } from './guards/auth.guard';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    NavigationBarComponent,
    ProductVisualizerComponent,
    AllProductsComponent,
    ProductDetailsComponent,
    SearchingToolsComponent,
    CartComponent,
    CartItemComponent,
  ],
  imports: [
    CommonModule,
    GroceryRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('state-store', reducers),
  ],
  providers: [AuthGuard, NotLoggedInGuard],
})
export class GroceryModule {}
