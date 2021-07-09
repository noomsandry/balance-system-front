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

  transactionForm: FormGroup;
  submitted: boolean;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.transactionForm = this._fb.group({
      type: [TRANSACTION_TYPE.DEPOSITE, Validators.required],
      amount: [0, Validators.required],
      description: ['', Validators.required],
    });
  }

  submit() {
    this.submitted = true;
    if (this.transactionForm.valid) {
      const transaction = this.transactionForm.value;
      this.onSubmit.emit(transaction);
      this.transactionForm.patchValue({
        type: TRANSACTION_TYPE.DEPOSITE,
        amount: 0,
        description: '',
      });
      this.submitted = false;
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}
