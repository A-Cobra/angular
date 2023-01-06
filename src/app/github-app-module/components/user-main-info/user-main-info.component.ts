import { Component, Input, OnInit } from '@angular/core';
import { GithubUser } from '../../models/github-user.type';
import { defaultGithubUser } from '../../utils/default-github-user';

@Component({
  selector: 'app-user-main-info',
  templateUrl: './user-main-info.component.html',
  styleUrls: ['./user-main-info.component.scss'],
})
export class UserMainInfoComponent {
  @Input()
  currentUser: GithubUser = { ...defaultGithubUser };
  constructor() {}
}
