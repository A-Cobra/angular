import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  put(key: string, item: string) {
    localStorage.setItem(key, item);
  }
  get(key: string) {
    const response = localStorage.getItem(key);
    if (response === null) {
      return null;
    }
    return JSON.parse(response);
  }
}
