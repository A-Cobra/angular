import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { HamburgerIngredientComponent } from './hamburger/hamburger-ingredient/hamburger-ingredient.component';
import { HamburgerInteractionToolsComponent } from './hamburger/hamburger-interaction-tools/hamburger-interaction-tools.component';
import { HamburgerTableRendererComponent } from './hamburger/hamburger-table-renderer/hamburger-table-renderer.component';
import { HamburgerRendererComponent } from './hamburger/hamburger-renderer/hamburger-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    HamburgerComponent,
    HamburgerIngredientComponent,
    HamburgerInteractionToolsComponent,
    HamburgerTableRendererComponent,
    HamburgerRendererComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
