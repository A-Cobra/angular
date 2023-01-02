import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountriesFetcherService {
  baseUrl = environment.countriesStatesUrl;
  headers: HttpHeaders = new HttpHeaders({
    Authorization: environment.authToken,
    Accept: 'application/json',
  });
  // header: HttpHeaders = {};
  constructor(private http: HttpClient) {}
  // getCountries(): Observable<string[]> {
  //   return this.http.get<string[]>(this.baseUrl, {
  //     headers: this.headers,
  //   });
  //   // .pipe(map(responseObj => responseObj.country_name));
  // }
  getToken() {
    const header2 = new HttpHeaders({
      Accept: 'application/json',
      'api-token': environment.apiToken,
      'user-email': 'conradbravina@gmail.com',
    });
    return this.http.get(this.baseUrl + 'getaccesstoken', {
      headers: header2,
    });
  }
  getCountries() {
    return this.http
      .get(this.baseUrl + 'countries/', {
        headers: this.headers,
      })
      .pipe(
        catchError(error => of([])),
        map(data => {
          console.log(data);
          return (data as Array<any>).map(
            responseObj => responseObj.country_name
          );
        })
      );
  }
  getStates(country: string) {
    console.log('environment.bearerToken');
    console.log(environment.authToken);
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
