import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { FormEvent } from './models/form-event.type';
import { GithubUser } from './models/github-user.type';
import { Repository } from './models/repository.type';
import { GithubProfileFetcherService } from './services/github-profile-fetcher/github-profile-fetcher.service';
import { defaultGithubUser } from './utils/default-github-user';

import { NgxSpinnerService } from 'ngx-spinner';

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
  title = 'Github profile Fetcher App V2 ngEdition';

  constructor(
    private githubService: GithubProfileFetcherService,
    private spinner: NgxSpinnerService
  ) {}

  onEventEmitted(formEvent: FormEvent) {
    this.resetParams();
    this.spinner.show();
    if (formEvent.type === 'search') {
      this.getUser(formEvent.inputValue);
    }
  }

  getUser(username: string) {
    this.githubService.getUser(username).subscribe({
      next: (response: GithubUser) => {
        this.currentUser = response;
        this.getAdditionalUserInfo(username);
      },
      error: (error: Response) => {
        if (error.status === 404) {
          this.notFound = true;
        } else if (error.status === 403) {
          this.accessDenied = true;
        }
        this.userQueryFailure = true;
        this.spinner.hide();
        this.dataReady = true;
      },
    });
  }

  getAdditionalUserInfo(username: string) {
    const observableZip$ = zip(
      this.githubService.getFollowers(username),
      this.githubService.getRepositories(username)
    );
    observableZip$.subscribe({
      next: ([followers, repositories]: [GithubUser[], Repository[]]) => {
        this.repositories = repositories;
        this.followers = followers;
      },
      error: (error: Response) => {
        this.repositoriesQueryFailure = true;
        this.followersQueryFailure = true;
      },
      complete: () => {
        this.dataReady = true;
        this.spinner.hide();
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
