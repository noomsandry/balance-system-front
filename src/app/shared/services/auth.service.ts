import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { tap, pluck } from 'rxjs/operators';

import { LocalStorageProvider } from '@shared/provider/local-storage.provider';
import { User } from '@shared/models';
import { environment } from '@environments/environment';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'authToken';
  private user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageProvider
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponse>(environment.apiUrl + '/api/auth/login', {
        email,
        password,
      })
      .pipe(
        tap(({ token, user }) => {
          this.setUser(user);
          this.localStorage.setObject(this.tokenKey, token);
        }),
        pluck('user')
      );
  }

  register(
    name: string,
    lastname: string,
    email: string,
    password: string
  ): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/auth/register', {
      name,
      lastname,
      email,
      password,
    });
  }

  setUser(user: User | null): void {
    this.user$.next(user);
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  me(): Observable<User> {
    const token: string | null = this.localStorage.getObject(this.tokenKey);

    if (token === null) {
      return EMPTY;
    }

    return this.http
      .get<AuthResponse>(environment.apiUrl + '/api/auth/me')
      .pipe(
        tap(({ user }) => this.setUser(user)),
        pluck('user')
      );
  }

  signOut(): void {
    this.localStorage.remove(this.tokenKey);
    this.localStorage.removeAll();
    this.setUser(null);
  }

  getAuthorizationHeaders() {
    const token: string | null =
      this.localStorage.getObject(this.tokenKey) || '';
    return { Authorization: `Bearer ${token}` };
  }

  /**
   * Let's try to get user's information if he was logged in previously,
   * thus we can ensure that the user is able to access the `/` (home) page.
   */
  checkTheUserOnTheFirstLoad(): Promise<User> {
    return this.me().toPromise();
  }
}
