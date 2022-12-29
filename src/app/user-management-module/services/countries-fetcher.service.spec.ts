import { TestBed } from '@angular/core/testing';

import { CountriesFetcherService } from './countries-fetcher.service';

describe('CountriesFetcherService', () => {
  let service: CountriesFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
