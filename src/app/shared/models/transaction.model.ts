export enum TRANSACTION_TYPE {
  WITHDRAWN = 'WITHDRAWN',
  DEPOSITE = 'DEPOSITE',
}
export class Transaction {
  transaction_id: number;
  account_id: number;
  description: string;
  amount: number;
  type: TRANSACTION_TYPE;
  date: Date;
}
