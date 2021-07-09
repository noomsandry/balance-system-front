import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { TransactionService } from '@shared/services/transaction.service';
import { AuthService } from '@shared/services';
import * as TransactionActions from './transaction.action';

@Injectable()
export class TransactionEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadTransaction),
      mergeMap(() =>
        this.transactionService.list().pipe(
          map((items) => {
            return TransactionActions.transactionLoaded({
              transactions: items,
            });
          })
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.createTransaction),
      withLatestFrom(this.authService.getUser()),
      mergeMap(([{ transaction }, user]) =>
        this.transactionService.create(transaction).pipe(
          map((item) => {
            /**
             * update current user balance
             */
            if (user) {
              user.account.balance = item.balance;
              this.authService.setUser(user);
            }
            return TransactionActions.TransactionCreated({
              transaction: item,
            });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}
}
