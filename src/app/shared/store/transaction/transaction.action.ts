import { createAction, props, union } from "@ngrx/store";
import { Transaction } from "@shared/models";

const source = "transaction";

export const loadTransaction = createAction(`[${source}] load`);
export const transactionLoaded = createAction(`[${source}] loaded`, props<{ transactions: Transaction[] }>());
export const createTransaction = createAction(
  `[${source}] create`,
  props<{ transaction: Transaction }>()
);
export const TransactionCreated = createAction(
  `[${source}] created`,
  props<{ transaction: Transaction }>()
);
