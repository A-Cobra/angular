import { Pipe, PipeTransform } from '@angular/core';
import { TimeMeasure } from '../../models/time-measure.type';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(timeStamp: string, timeMeasure?: TimeMeasure): string {
    console.log(timeStamp);
    const date = new Date(timeStamp);
    const currentDate = new Date();
    let currentDay = String(currentDate.getDate());
    let differenceOfSeconds = currentDate.getTime() - date.getTime();
    const millisecondsToDays = 86400000;
    let differenceOfDays = differenceOfSeconds / millisecondsToDays;
    let year = String(date.getFullYear());
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    if (differenceOfSeconds < 0) {
      return `${year}/${month}/${day}`;
    }
    if (month.length == 1) {
      month = '0' + month;
    }
    if (day.length == 1) {
      day = '0' + day;
    }
    if (timeMeasure) {
      if (timeMeasure === 'year') {
        return `${year}/${month}/${day} (${Math.floor(
          differenceOfDays / 365
        )} ${Math.floor(differenceOfDays / 365) === 1 ? 'year' : 'years'} ago)`;
      }
      if (timeMeasure === 'month') {
        return `${year}/${month}/${day} (${Math.floor(differenceOfDays / 30)} ${
          Math.floor(differenceOfDays / 30) === 1 ? 'month' : 'months'
        } ago)`;
      }
      if (timeMeasure === 'day') {
        if (Math.floor(differenceOfDays) === 0) {
          if (parseInt(currentDay) - parseInt(day) === 0) {
            return `${year}/${month}/${day} (today)`;
          }
        }
        return `${year}/${month}/${day} (${Math.floor(differenceOfDays)} ${
          Math.floor(differenceOfDays) === 1 ? 'day' : 'days'
        } ago)`;
      }
    } else {
      if (Math.floor(differenceOfDays / 365) > 0) {
        return `${year}/${month}/${day} (${Math.floor(
          differenceOfDays / 365
        )} ${Math.floor(differenceOfDays / 365) === 1 ? 'year' : 'years'} ago)`;
      } else if (Math.floor(differenceOfDays / 30) > 0) {
        return `${year}/${month}/${day} (${Math.floor(differenceOfDays / 30)} ${
          Math.floor(differenceOfDays / 30) === 1 ? 'month' : 'months'
        } ago)`;
      } else {
        if (Math.floor(differenceOfDays) === 0) {
          if (parseInt(currentDay) - parseInt(day) === 0) {
            return `${year}/${month}/${day} (today)`;
          }
        }
        return `${year}/${month}/${day} (${Math.floor(differenceOfDays)} ${
          Math.floor(differenceOfDays) === 1 ? 'day' : 'days'
        } ago)`;
      }
    }
    return `${year}/${month}/${day}`;
  }
}
