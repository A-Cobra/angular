import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveLoginToken(loginToken: string) {
    localStorage.setItem('loginToken', loginToken);
  }

  getLoginToken(): string {
    return localStorage.getItem('loginToken') ?? '';
  }

  removeLoginToken() {
    localStorage.removeItem('loginToken');
  }
}
