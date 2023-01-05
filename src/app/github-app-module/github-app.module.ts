import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubAppRoutingModule } from './github-app-routing.module';
import { GithubAppComponent } from './github-app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from './containers/search-form/search-form.component';

// For services
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [GithubAppComponent, SearchFormComponent],
  imports: [
    CommonModule,
    GithubAppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [GithubAppComponent],
})
export class GithubAppModule {}
