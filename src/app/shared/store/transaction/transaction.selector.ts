import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, TransactionState } from './transaction.reducer';
import * as _ from 'lodash';

export const getRouteState =
  createFeatureSelector<TransactionState>('transactions');

export const selectAllTransaction = createSelector(getRouteState, selectAll);
export const selectTransactions = createSelector(
  selectAllTransaction,
  (entries) => _.orderBy(entries, 'createdAt', 'desc')
);
