import type { CurrencyCode, ICurrency } from '../types';

export const DEFAULT_CURRENCY_CODE: CurrencyCode = 'USD';

export const CURRENCIES: ICurrency[] = [
  { code: 'USD', label: 'USD', symbol: '$' },
  { code: 'EUR', label: 'EUR', symbol: '€' },
  { code: 'GBP', label: 'GBP', symbol: '£' },
  { code: 'TRY', label: 'TRY', symbol: '₺' },
  { code: 'RUB', label: 'RUB', symbol: '₽' },
  { code: 'UAH', label: 'UAH', symbol: '₴' },
  { code: 'KRW', label: 'KRW', symbol: '₩' },
  { code: 'JPY', label: 'JPY', symbol: '¥' },
  { code: 'ILS', label: 'ILS', symbol: '₪' },
  { code: 'CNY', label: 'CNY', symbol: '¥' },
];

export const CURRENCY_DENOMINATOR = 1000;
