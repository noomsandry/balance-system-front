import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { DollarPipe } from './pipes';

@NgModule({
  declarations: [ToastComponent, DollarPipe],
  imports: [CommonModule, NgbToastModule],
  exports: [ToastComponent, DollarPipe],
})
export class SharedModule {}
