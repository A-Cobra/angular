import { Component } from '@angular/core';
import { FormEvent } from './models/form-event.type';
import { GithubUser } from './models/github-user.type';
import { Repository } from './models/repository.type';
import { GithubProfileFetcherService } from './services/github-profile-fetcher/github-profile-fetcher.service';
import { defaultGithubUser } from './utils/default-github-user';

@Component({
  selector: 'app-github-app',
  templateUrl: './github-app.component.html',
  styleUrls: ['./github-app.component.scss'],
})
export class GithubAppComponent {
  dataReady = false;
  followers: GithubUser[] = [];
  currentUser: GithubUser = { ...defaultGithubUser };
  repositories: Repository[] = [];

  constructor(private githubService: GithubProfileFetcherService) {}

  onEventEmitted(formEvent: FormEvent) {
    if (formEvent.type === 'search') {
      this.getUser(formEvent.inputValue);
      this.getUserFollowers(formEvent.inputValue);
      this.getRepositories(formEvent.inputValue);
    }
  }

  getUser(username: string) {
    this.githubService.getUser(username).subscribe({
      next: (response: GithubUser) => {
        console.log(response);
        this.currentUser = response;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getUserFollowers(username: string) {
    this.githubService.getFollowers(username).subscribe({
      next: (response: GithubUser[]) => {
        console.log(response);
        this.followers = response;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getRepositories(username: string) {
    this.githubService.getRepositories(username).subscribe({
      next: (response: Repository[]) => {
        console.log(response);
        this.repositories = response;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  queryUserData(username: string) {}
}
