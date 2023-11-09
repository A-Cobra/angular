export enum timeMeasureEnum {
  'day',
  'month',
  'year',
}

export const timeMeasureEnumKeys = Object.keys(timeMeasureEnum).filter(x =>
  isNaN(parseFloat(x))
);
