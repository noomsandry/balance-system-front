import { Account } from './account.model';

export enum TRANSACTION_TYPE {
  WITHDRAWN = 'WITHDRAWN',
  DEPOSITE = 'DEPOSITE',
}
export class Transaction {
  id: number;
  account_id: number;
  description: string;
  amount: number;
  type: TRANSACTION_TYPE;
  date: Date;
}
