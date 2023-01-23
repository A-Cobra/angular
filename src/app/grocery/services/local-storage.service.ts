import { Injectable } from '@angular/core';
import { LoginToken } from 'src/app/models/login-token.type';

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
