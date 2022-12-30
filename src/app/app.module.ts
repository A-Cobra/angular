import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Other Modules
import { UserManagementModule } from './user-management-module/user-management.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UserManagementModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
