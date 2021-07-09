import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '@shared/models';
import { AuthService } from '@shared/services';

@Component({
  selector: 'app-user-account-info',
  templateUrl: './user-account-info.component.html',
  styleUrls: ['./user-account-info.component.scss'],
})
export class UserAccountInfoComponent implements OnInit, OnDestroy {
  user: User;
  private _unsubscribeAll: Subject<any>;
  constructor(private authService: AuthService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.authService
      .getUser()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user) => {
        if (user) {
          this.user = user;
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
