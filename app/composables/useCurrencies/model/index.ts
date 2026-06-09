import type { CurrencyCode, ICurrency } from '../types';

export const DEFAULT_CURRENCY_CODE: CurrencyCode = 'usd';

export const CURRENCIES: ICurrency[] = [
  { code: 'usd', label: 'USD', symbol: '&#36;' }, // $
  { code: 'eur', label: 'EUR', symbol: '&#8364;' }, // €
  { code: 'gbp', label: 'GBP', symbol: '&#163;' }, // £
  { code: 'try', label: 'TRY', symbol: '&#8378;' }, // ₺
  { code: 'rub', label: 'RUB', symbol: '&#8381;' }, // ₽
  { code: 'uah', label: 'UAH', symbol: '&#8372;' }, // ₴
  { code: 'krw', label: 'KRW', symbol: '&#8361;' }, // ₩
  { code: 'jpy', label: 'JPY', symbol: '&#165;' }, // ¥
  { code: 'ils', label: 'ILS', symbol: '&#8362;' }, // ₪
  { code: 'yen', label: 'CNY', symbol: '&#165;' }, // ¥
];
