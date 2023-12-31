import { Component, Input, OnInit } from '@angular/core';
import { GithubUser } from '../../models/github-user.type';
import { Repository } from '../../models/repository.type';
import { defaultGithubUser } from '../../utils/default-github-user';

@Component({
  selector: 'app-user-info-display',
  templateUrl: './user-info-display.component.html',
  styleUrls: ['./user-info-display.component.scss'],
})
export class UserInfoDisplayComponent {
  @Input()
  currentUser: GithubUser = { ...defaultGithubUser };
  @Input()
  currentUserRepositories: Repository[] = [];

  constructor() {}

  getTotalNumberOfStars() {
    let counter = 0;
    this.currentUserRepositories.forEach((repository: Repository) => {
      counter += repository.stargazers_count;
    });
    return counter;
  }
}
