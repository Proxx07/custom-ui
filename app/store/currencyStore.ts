import { CURRENCY_DENOMINATOR, useCurrencies } from '@/composables/useCurrencies';
import { createEnumFromArray } from '@/utils/arrayFormatters';

export const useCurrenciesStore = defineStore('currencies', () => {
  const { currency, selectedCurrency, currencies, currenciesListLoading, fetchCurrencies } = useCurrencies();

  const currenciesEnum = computed(() => createEnumFromArray(currencies.value, 'type'));

  const calculatePrice = (price: number): number => {
    const selectedCurrencyRate = currenciesEnum.value[selectedCurrency.value.code]?.price || CURRENCY_DENOMINATOR;
    const result = (price / CURRENCY_DENOMINATOR) * (selectedCurrencyRate / CURRENCY_DENOMINATOR);
    return Number.parseFloat(result.toFixed(2));
  };

  const priceToCurrency = (calculatedPriceValue: number, withSymbol: boolean = true): string => {
    return (withSymbol ? `${selectedCurrency.value.symbol} ` : '') + calculatedPriceValue.toLocaleString('ru-RU');
  };

  return {
    currency, selectedCurrency,
    currenciesEnum,
    currenciesListLoading,
    currencies,
    fetchCurrencies,
    calculatePrice,
    priceToCurrency,
  };
});
