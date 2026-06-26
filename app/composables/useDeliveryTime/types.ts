export type DeliveryTimeTypes = '1m' | '5m' | '12h';

export type DeliveryTimeRecord = Record<DeliveryTimeTypes, {
  name: `delivery.${DeliveryTimeTypes}`
  shortName: string
  icon: string
}>;
