import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubAppRoutingModule } from './github-app-routing.module';
import { GithubAppComponent } from './github-app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from './containers/search-form/search-form.component';

@NgModule({
  declarations: [GithubAppComponent, SearchFormComponent],
  imports: [CommonModule, GithubAppRoutingModule, ReactiveFormsModule],
  exports: [GithubAppComponent],
})
export class GithubAppModule {}
