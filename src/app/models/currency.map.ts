const currencies: Array<{
  name: string;
  code: string;
  conversionRate: number;
}> = [
  {
    name: 'us dollar',
    code: 'USD',
    conversionRate: 1,
  },
  {
    name: 'mexican peso',
    code: 'MXN',
    conversionRate: 20,
  },
  {
    name: 'euro',
    code: 'EUR',
    conversionRate: 0.9,
  },
];

export const currencyMap = new Map();
currencies.forEach(element => {
  currencyMap.set(element.name, {
    code: element.code,
    conversionRate: element.conversionRate,
  });
});
