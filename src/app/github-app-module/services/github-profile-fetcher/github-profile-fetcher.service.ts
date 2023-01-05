import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { GithubUser } from '../../models/github-user.type';

@Injectable({
  providedIn: 'root',
})
export class GithubProfileFetcherService {
  githubEndpointBase = environment.githubEndpoint;
  constructor(private http: HttpClient) {}
  getUser(username: string) {
    return this.http.get<GithubUser>(`${this.githubEndpointBase}/${username}`);
  }
}
