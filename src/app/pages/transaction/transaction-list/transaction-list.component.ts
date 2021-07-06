import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as transactionSelector from '@shared/store/transaction/transaction.selector';
@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;

  constructor(private store: Store) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.store
      .pipe(
        takeUntil(this._unsubscribeAll),
        select(transactionSelector.selectTransactions)
      )
      .subscribe((transactions) => {
        console.log(transactions);
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
