import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryFetcherService {
  baseUrl = environment.countriesStatesUrl;
  headers: HttpHeaders = new HttpHeaders({
    Authorization: environment.authToken,
    Accept: 'application/json',
  });

  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http
      .get(this.baseUrl + 'countries/', {
        headers: this.headers,
      })
      .pipe(
        catchError(error => of([])),
        map(data => {
          return (data as Array<any>).map(
            responseObj => responseObj.country_name
          );
        })
      );
  }

  getStates(country: string) {
    return this.http
      .get(this.baseUrl + 'states/' + country, {
        headers: this.headers,
      })
      .pipe(
        catchError(error => of([])),
        map(data => {
          return (data as Array<any>).map(
            responseObj => responseObj.state_name
          );
        })
      );
  }
}
