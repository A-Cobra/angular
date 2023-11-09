import { TestBed } from '@angular/core/testing';

import { GithubProfileFetcherService } from './github-profile-fetcher.service';

describe('GithubProfileFetcherService', () => {
  let service: GithubProfileFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubProfileFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
