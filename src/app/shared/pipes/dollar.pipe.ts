import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dollar' })
export class DollarPipe implements PipeTransform {
  transform(value): string {
    value = parseInt(value, 10);
    if (Number.isInteger(value)) {
      return `${value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ${' $'}`;
    }
  }
}
