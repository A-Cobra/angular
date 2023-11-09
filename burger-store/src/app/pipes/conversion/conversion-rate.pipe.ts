import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversionRate',
})
export class ConversionRatePipe implements PipeTransform {
  transform(value: number | undefined, args: number): number {
    if (value && args) {
      return value * args;
    }
    if (typeof value === undefined) {
      return 0;
    }
    return value as number;
  }
}
