import { Component } from '@angular/core';
import { FormEvent } from './models/form-event.type';
import { GithubUser } from './models/github-user.type';
import { GithubProfileFetcherService } from './services/github-profile-fetcher/github-profile-fetcher.service';

@Component({
  selector: 'app-github-app',
  templateUrl: './github-app.component.html',
  styleUrls: ['./github-app.component.scss'],
})
export class GithubAppComponent {
  petition!: GithubUser;

  constructor(private githubService: GithubProfileFetcherService) {}

  onEventEmitted(formEvent: FormEvent) {
    if (formEvent.type === 'search') {
      this.searchUser(formEvent.inputValue);
    }
  }

  searchUser(username: string) {
    this.githubService.getUser(username).subscribe({
      next: (response: GithubUser) => {
        console.log(response);
        this.petition = response;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
