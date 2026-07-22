import type { CurrenciesResponse, CurrencyCode, CurrencyWithPrice, ICurrency } from './types';
import { CURRENCIES, DEFAULT_CURRENCY_CODE } from './model';

export const useCurrencies = () => {
  const { $request } = useNuxtApp();

  const _currency = useCookie<CurrencyCode>('currency', { default: () => DEFAULT_CURRENCY_CODE });

  const currency = computed({
    get() {
      return _currency.value;
    },
    set(value: CurrencyCode) {
      _currency.value = value;
    },
  });

  const selectedCurrency = computed<ICurrency>(() => {
    return CURRENCIES.find(c => c.code === currency.value) || CURRENCIES[0]!;
  });

  const currencies = useState<CurrencyWithPrice[]>('currencies', () => shallowRef([]));

  const fetchCurrencies = async () => {
    const response = await $request<CurrenciesResponse>('/api/currencies', { silent: true });
    currencies.value = response.data?.data || [];
  };

  return {
    currency,
    selectedCurrency,

    currencies,
    fetchCurrencies,
  };
};
