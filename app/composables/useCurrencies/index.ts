import type {CurrencyCode} from "./type";
import {currencies, DEFAULT_CURRENCY_CODE} from "./model";

export const useCurrencies = () => {
  const currentCurrency = useCookie<CurrencyCode>('currency', { default: () => DEFAULT_CURRENCY_CODE });

  const setCurrentCurrency = (value: CurrencyCode) => {
    currentCurrency.value = value;
  }

  return {
    currencies,
    currentCurrency,
    setCurrentCurrency,
  }
}