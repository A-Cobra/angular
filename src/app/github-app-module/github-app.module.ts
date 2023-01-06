import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubAppRoutingModule } from './github-app-routing.module';
import { GithubAppComponent } from './github-app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from './containers/search-form/search-form.component';

// For services
import { HttpClientModule } from '@angular/common/http';
import { UserInfoDisplayComponent } from './components/user-info-display/user-info-display.component';
import { TimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
import { UserMainInfoComponent } from './components/user-main-info/user-main-info.component';
import { RepositoryDisplayComponent } from './components/repository-display/repository-display.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import library module
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    GithubAppComponent,
    SearchFormComponent,
    UserInfoDisplayComponent,
    TimeAgoPipe,
    UserMainInfoComponent,
    RepositoryDisplayComponent,
  ],
  imports: [
    CommonModule,
    GithubAppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  exports: [GithubAppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GithubAppModule {}
