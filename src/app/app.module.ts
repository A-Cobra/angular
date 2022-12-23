import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { HamburgerIngredientComponent } from './hamburger/hamburger-ingredient/hamburger-ingredient.component';

@NgModule({
  declarations: [
    AppComponent,
    HamburgerComponent,
    HamburgerIngredientComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
