import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { TransactionService } from '@shared/services/transaction.service';
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
      mergeMap(({ transaction }) =>
        this.transactionService.create(transaction).pipe(
          map((item) => {
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
    private transactionService: TransactionService
  ) {}
}
