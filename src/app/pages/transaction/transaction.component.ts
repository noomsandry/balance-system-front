import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Transaction, User } from '@shared/models';
import { AuthService } from '@shared/services';
import * as TransactionActions from '@shared/store/transaction/transaction.action';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit, OnDestroy {
  user: User;
  private _unsubscribeAll: Subject<any>;
  constructor(private store: Store, private authService: AuthService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.store.dispatch(TransactionActions.loadTransaction());
    this.authService
      .getUser()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user) => {
        if (user) {
          this.user = user;
        }
      });
  }

  create(transaction: Transaction) {
    transaction.account_id = this.user.account.id;
    this.store.dispatch(TransactionActions.createTransaction({ transaction }));
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
