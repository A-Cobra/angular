import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GithubProfileFetcherService {
  githubEndpointBase = environment.githubEndpoint;
  constructor(private http: HttpClient) {}
  getUser(username: string) {
    return this.http.get(`${this.githubEndpointBase}/${username}`);
  }
}
