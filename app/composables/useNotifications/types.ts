export type NotificationActions = 'deposit_funds' | 'gift_withdraw' | 'giveaway_create' | 'giveaway_refund'
  | 'giveaway_win' | 'sending_steam' | 'withdraw_funds' | 'withdrawing_steam';

export type NotificationParameter = 'accepted_trade' | 'buying' | 'canceled' | 'completed' | 'created'
  | 'declined' | 'declined_trade' | 'error' | 'paid' | 'pending' | 'processing' | 'selling' | 'sending'
  | 'sent_trade' | 'sent_trade_to_you' | 'waiting_conf' | 'waiting_mobile';

export interface INotification {
  id: number
  identification: string
  action: NotificationActions
  parameter: NotificationParameter
  message: string
  read: boolean
  user: string
  created: string // Date

  link?: string
  image?: string
}

export type NotificationActionIcons = Record<NotificationActions, string>;
export type NotificationParamStatus = Record<NotificationParameter, 'success' | 'error' | 'awaiting'>;

export interface NotificationsResponse {
  items: INotification[]
  next_cursor: string
  unread: number
  unread_capped: false
}
