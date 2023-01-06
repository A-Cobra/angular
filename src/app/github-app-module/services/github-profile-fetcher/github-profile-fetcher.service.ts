import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { GithubUser } from '../../models/github-user.type';
import { Repository } from '../../models/repository.type';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubProfileFetcherService {
  githubEndpointBase = environment.githubEndpoint;
  constructor(private http: HttpClient) {}
  getUser(username: string) {
    return this.http.get<GithubUser>(`${this.githubEndpointBase}/${username}`);
  }
  getFollowers(username: string) {
    return this.http
      .get<GithubUser[]>(
        `${this.githubEndpointBase}/${username}/followers${environment.followersUrlParams}`
      )
      .pipe(catchError(error => of([])));
  }
  getRepositories(username: string) {
    return this.http
      .get<Repository[]>(
        `${this.githubEndpointBase}/${username}/repos${environment.repositoriesUrlParams}`
      )
      .pipe(catchError(error => of([])));
  }
}
