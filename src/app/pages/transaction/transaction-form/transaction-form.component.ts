import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction, TRANSACTION_TYPE } from '@shared/models';
@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  transaction: Transaction = new Transaction();
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  form: FormGroup;
  submitted: boolean;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      account_id: [this.transaction.account_id],
      description: ['', Validators.required],
      amount: [0, Validators.required],
      type: [TRANSACTION_TYPE.WITHDRAWN, Validators.required],
      date: [new Date()],
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.valid) {
      const transaction = this.form.value;
      this.onSubmit.emit(transaction);
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}
