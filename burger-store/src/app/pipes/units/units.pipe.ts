import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'units',
})
export class UnitsPipe implements PipeTransform {
  transform(value: number, args: number) {
    if (value && args) {
      return value * args;
    }
    return value;
  }
}
