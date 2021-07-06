import { Account } from "./account.model";

export class User {
  user_id: number;
  name: string;
  lastname: string;
  email: string;
  account: Account;
}
