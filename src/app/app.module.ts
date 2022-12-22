import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarAccordionComponent } from './car-accordion/car-accordion.component';
import { CarAccordionItemComponent } from './car-accordion/car-accordion-item/car-accordion-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CarAccordionComponent,
    CarAccordionItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
