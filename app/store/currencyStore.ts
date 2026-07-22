import { CURRENCY_DENOMINATOR, useCurrencies } from '@/composables/useCurrencies';
import { createEnumFromArray } from '@/utils/arrayFormatters';

export const useCurrenciesStore = defineStore('currencies', () => {
  const { currency, selectedCurrency, currencies, fetchCurrencies } = useCurrencies();

  const currenciesEnum = computed(() => createEnumFromArray(currencies.value, 'type'));

  const calculatePrice = (price: number): number => {
    const selectedCurrencyRate = currenciesEnum.value[selectedCurrency.value.code]?.price || 1;
    const result = (price / CURRENCY_DENOMINATOR) * (selectedCurrencyRate / CURRENCY_DENOMINATOR);
    return Number.parseFloat(result.toFixed(2));
  };

  return {
    currency, selectedCurrency,
    currenciesEnum,
    currencies, fetchCurrencies,
    calculatePrice,
  };
});
