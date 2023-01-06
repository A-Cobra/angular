import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GithubUser } from '../../models/github-user.type';
import { Repository } from '../../models/repository.type';

@Injectable({
  providedIn: 'root',
})
export class GithubProfileFetcherService {
  githubEndpointBase = environment.githubEndpoint;
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders({
    Authorization: `Bearer ${environment.authToken}`,
    Accept: 'application/vnd.github+json',
  });
  getUser(username: string) {
    return this.http.get<GithubUser>(`${this.githubEndpointBase}/${username}`, {
      headers: this.headers,
    });
  }
  getFollowers(username: string) {
    return this.http.get<GithubUser[]>(
      `${this.githubEndpointBase}/${username}/followers${environment.followersUrlParams}`,
      { headers: this.headers }
    );
    // .pipe(catchError(error => of([])));
  }
  getRepositories(username: string) {
    return this.http.get<Repository[]>(
      `${this.githubEndpointBase}/${username}/repos${environment.repositoriesUrlParams}`,
      { headers: this.headers }
    );
    // .pipe(catchError(error => of([])));
  }
}
