import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { TransactionEffects } from '@shared/store/transaction/transaction.effect';
import { reducer } from '@shared/store/transaction/transaction.reducer';
import { environment } from '@environments/environment';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionComponent } from './transaction.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionFormComponent,
    TransactionComponent,
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ transactions: reducer }),
    EffectsModule.forRoot([TransactionEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    SharedModule,
  ],
})
export class TransactionModule {}
