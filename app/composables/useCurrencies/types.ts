export type CurrencyCode = string;

export interface ICurrency {
  code: CurrencyCode
  label: string
  symbol: string
}

export interface CurrencyWithPrice {
  type: CurrencyCode
  price: number
}

export interface CurrenciesResponse {
  success: boolean
  data: CurrencyWithPrice[]
}
