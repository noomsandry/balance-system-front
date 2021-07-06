import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageProvider {
  localStorage: any;

  constructor() {
    if (!localStorage) {
      throw new Error('Current browser does not support Local Storage');
    } else {
      this.localStorage = localStorage;
    }
  }

  set(key: string, value: string): void {
    this.localStorage.setItem(key, value);
  }

  get(key: string): string {
    return this.localStorage.getItem(key) || false;
  }

  setObject(key: string, value: any): void {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  getObject(key: string): any {
    return JSON.parse(this.localStorage.getItem(key) || false);
  }

  remove(key: string): any {
    this.localStorage.removeItem(key);
  }

  removeAll(): any {
    this.localStorage.clear();
  }
}
