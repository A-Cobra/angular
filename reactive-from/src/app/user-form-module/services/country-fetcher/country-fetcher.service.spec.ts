import { TestBed } from '@angular/core/testing';

import { CountryFetcherService } from './country-fetcher.service';

describe('CountryFetcherService', () => {
  let service: CountryFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
