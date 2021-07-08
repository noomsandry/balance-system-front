import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Transaction } from '@shared/models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private _http: HttpClient) {}

  list(): Observable<Transaction[]> {
    let path = `${environment.apiUrl}/transaction`;
    return this._http.get(`${path}`).pipe(map((data: any) => data.data));
  }
}
