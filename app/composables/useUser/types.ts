import type { LanguagesTypes } from '~~/i18n/types';
import type { CurrencyCode } from '@/composables/useCurrencies';
import type { gameTypes } from '@/composables/useGames';

export interface IPrimeTime {
  timezone: string
  start_time: string // 00:00:00
  end_time: string // 00:00:00
}

export interface IUser {
  id: string
  userid: string
  steam_id: string
  token?: string

  name: string
  avatar: string
  email: string
  email_verified: boolean
  lang: LanguagesTypes
  currency: CurrencyCode
  code: string
  referal?: string
  wallet: number
  total_hold_amount: number
  sell_fees: number
  barters_discount: number

  can_sell: boolean
  can_p2p: boolean
  ban: boolean
  ban_p2p: boolean

  force_off: boolean
  trade_eligibility: Record<gameTypes, { can_buy: boolean, can_sell: boolean }>
  tradelink: string
  failed_trades: number
  failed_row: number
  success_trades: number

  notifications: string[] // Todo find it's enums or create it in client side
  dismissed_modals: string[] // Todo find it's enums or create it in client side

  api: string // User api key
  average_time: number
  rank: number
  has_fa: boolean
  has_name: boolean
  multiple_refs: boolean
  custom_moderator: boolean
  verified: boolean

  kyc_status?: 'approved' // wft can be here?
  require_fa: boolean

  shop: string // user shop param for link
  shop_public: boolean
  shop_history: boolean
  trader: boolean

  need_whitelisted_ip: boolean
  store_steam_creds: boolean
  hold_spend_enabled: boolean

  withdraw_settings: {
    max_can_withdraw: number
    max_limit_withdraw: number
  }

  prime_time: IPrimeTime
  time: string // DateTime
  next_d_collect?: string // DateTime
  next_tg_collect?: string // DateTime
  no_p2p_until?: string // DateTime
  created: string // DateTime
}
