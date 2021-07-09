import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dollar' })
export class DollarPipe implements PipeTransform {
  transform(value): string {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(value);
  }
}
