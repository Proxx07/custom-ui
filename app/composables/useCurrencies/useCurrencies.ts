import type { CurrencyCode } from './types';
import { CURRENCIES, DEFAULT_CURRENCY_CODE } from './model';

export const useCurrencies = () => {
  const currentCurrency = useCookie<CurrencyCode>('currency', { default: () => DEFAULT_CURRENCY_CODE });

  const setCurrentCurrency = (value: CurrencyCode) => {
    currentCurrency.value = value;
  };

  const currency = computed({
    get() {
      return currentCurrency.value;
    },
    set(value: CurrencyCode) {
      setCurrentCurrency(value);
    },
  });

  const selectedCurrency = computed(() => {
    return CURRENCIES.find(c => c.code === currency.value);
  });

  return {
    currency,
    selectedCurrency,
    setCurrentCurrency,
  };
};
