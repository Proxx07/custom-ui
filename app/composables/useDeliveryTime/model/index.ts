import type { DeliveryTimeRecord, DeliveryTimeTypes } from '../types';
import { fastDelivery, instantDelivery, manualDelivery } from '@/assets/icons/features';

export const DELIVERY_TIME_LIST: DeliveryTimeTypes[] = ['1m', '5m', '12h'];

export const DELIVERY_TIME_RECORD: DeliveryTimeRecord = {
  '1m': {
    name: 'delivery.1m',
    shortName: '1m',
    icon: instantDelivery,
  },

  '5m': {
    name: 'delivery.5m',
    shortName: '5m',
    icon: fastDelivery,
  },

  '12h': {
    name: 'delivery.12h',
    shortName: '12h',
    icon: manualDelivery,
  },
};
