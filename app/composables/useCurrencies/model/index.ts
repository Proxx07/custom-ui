import type { CurrencyCode, ICurrency } from '../types';

export const DEFAULT_CURRENCY_CODE: CurrencyCode = 'usd';

export const CURRENCIES: ICurrency[] = [
  { code: 'usd', label: 'USD', symbol: '$' }, // $
  { code: 'eur', label: 'EUR', symbol: '€' }, // €
  { code: 'gbp', label: 'GBP', symbol: '£' }, // £
  { code: 'try', label: 'TRY', symbol: '₺' }, // ₺
  { code: 'rub', label: 'RUB', symbol: '₽' }, // ₽
  { code: 'uah', label: 'UAH', symbol: '₴' }, // ₴
  { code: 'krw', label: 'KRW', symbol: '₩' }, // ₩
  { code: 'jpy', label: 'JPY', symbol: '¥' }, // ¥
  { code: 'ils', label: 'ILS', symbol: '₪' }, // ₪
  { code: 'yen', label: 'CNY', symbol: '¥' }, // ¥
];
