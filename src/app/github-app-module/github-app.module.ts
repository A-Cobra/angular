import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubAppRoutingModule } from './github-app-routing.module';
import { GithubAppComponent } from './github-app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from './containers/search-form/search-form.component';

// For services
import { HttpClientModule } from '@angular/common/http';
import { UserInfoDisplayComponent } from './components/user-info-display/user-info-display.component';
import { TimeAgoPipe } from './pipes/time-ago/time-ago.pipe';

@NgModule({
  declarations: [
    GithubAppComponent,
    SearchFormComponent,
    UserInfoDisplayComponent,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    GithubAppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [GithubAppComponent],
})
export class GithubAppModule {}
