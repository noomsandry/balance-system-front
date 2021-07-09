import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Transaction } from '@shared/models';
import * as TransactionActions from './transaction.action';

export const adapter: EntityAdapter<Transaction> =
  createEntityAdapter<Transaction>({
    selectId: (entry) => entry.id,
  });

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();

export interface TransactionState extends EntityState<Transaction> {}

export function reducer(state: TransactionState | undefined, action: Action) {
  return transactionReducer(state, action);
}

export const initialTransactionState: TransactionState =
  adapter.getInitialState({});

export const transactionReducer = createReducer(
  initialTransactionState,
  on(TransactionActions.TransactionCreated, (state, { transaction }) =>
    adapter.addOne(transaction, { ...state })
  ),
  on(TransactionActions.transactionLoaded, (state, { transactions }) =>
    adapter.setAll(transactions, { ...state })
  )
);
