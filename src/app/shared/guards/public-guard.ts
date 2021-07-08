import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@shared/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(private authService: AuthService, private _router: Router) {}
  canActivate(): Observable<boolean> {
    return this.authService.getUser().pipe(
      map((user) => {
        if (user) {
          this._router.navigate(['/']);
        }
        return true;
      })
    );
  }
}
