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
  currentUser: GithubUser = { ...defaultGithubUser };
  followers: GithubUser[] = [];
  repositories: Repository[] = [];
  userQueryFailure = false;
  accessDenied = false;
  followersQueryFailure = false;
  repositoriesQueryFailure = false;
  dataReady = false;
  notFound = false;

  constructor(private githubService: GithubProfileFetcherService) {}

  onEventEmitted(formEvent: FormEvent) {
    this.resetParams();
    if (formEvent.type === 'search') {
      this.getUser(formEvent.inputValue);
      // this.getUserFollowers(formEvent.inputValue);
      // this.getRepositories(formEvent.inputValue);
    }
  }

  getUser(username: string) {
    this.githubService.getUser(username).subscribe({
      next: (response: GithubUser) => {
        console.log(response);
        this.currentUser = response;
        this.getUserFollowers(username);
        this.getRepositories(username);
      },
      error: (error: any) => {
        if (error.status === 404) {
          this.notFound = true;
        } else if (error.status === 403) {
          this.accessDenied = true;
        }
        this.userQueryFailure = true;
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
        this.followersQueryFailure = true;
      },
    });
  }

  getRepositories(username: string) {
    this.githubService.getRepositories(username).subscribe({
      next: (response: Repository[]) => {
        console.log(response);
        this.repositories = response;
        this.dataReady = true;
      },
      error: (error: any) => {
        console.log(error);
        this.repositoriesQueryFailure = true;
        this.dataReady = true;
      },
    });
  }

  resetParams() {
    this.currentUser = { ...defaultGithubUser };
    this.followers = [];
    this.repositories = [];
    this.userQueryFailure = false;
    this.accessDenied = false;
    this.followersQueryFailure = false;
    this.repositoriesQueryFailure = false;
    this.dataReady = false;
    this.notFound = false;
  }
}
