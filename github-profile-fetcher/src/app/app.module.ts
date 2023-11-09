import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GithubAppModule } from './github-app-module/github-app.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, GithubAppModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
