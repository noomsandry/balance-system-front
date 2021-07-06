import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Transaction } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private url = `http://localhost:3000/`;

  constructor(private _http: HttpClient) {}

  list(): Observable<Transaction[]> {
    let path = `${this.url}transaction`;
    return this._http.get(`${path}`).pipe(map((data: any) => data.data));
  }
}
