import type { NotificationActionIcons, NotificationParamStatus } from '../types';
import { close, tickInCircle } from '@/assets/icons/actions';
import { gift } from '@/assets/icons/features';
import { loader } from '@/assets/icons/general';
import { steam } from '@/assets/icons/logos';

export const NOTIFICATION_ACTION_ICONS: NotificationActionIcons = {
  deposit_funds: 'currency',
  withdraw_funds: 'currency',

  sending_steam: steam,
  withdrawing_steam: steam,

  gift_withdraw: gift,
  giveaway_create: gift,
  giveaway_win: gift,
  giveaway_refund: gift,
};

export const NOTIFICATION_PARAMS_STATUS: NotificationParamStatus = {
  paid: 'secondary',
  created: 'secondary',
  completed: 'secondary',
  accepted_trade: 'secondary',

  buying: 'attention',
  pending: 'attention',
  selling: 'attention',
  sending: 'attention',
  processing: 'attention',
  sent_trade: 'attention',
  waiting_conf: 'attention',
  waiting_mobile: 'attention',
  sent_trade_to_you: 'attention',

  error: 'error',
  canceled: 'error',
  declined: 'error',
  declined_trade: 'error',
};

export const NOTIFICATION_STATUS_ICONS: Record<'secondary' | 'error' | 'attention', string> = {
  secondary: tickInCircle,
  error: close,
  attention: loader,
};
