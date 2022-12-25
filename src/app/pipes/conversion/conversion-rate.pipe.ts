import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversionRate',
})
export class ConversionRatePipe implements PipeTransform {
  transform(value: number, args: number): number {
    if (value && args) {
      return value * args;
    }
    return value;
  }
}
