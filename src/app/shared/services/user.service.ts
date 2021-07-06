import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}
  async getById(id) {
    return await this._http
      .get(`users/${id}`)
      .pipe(map((data) => data['data']))
      .toPromise();
  }
}
