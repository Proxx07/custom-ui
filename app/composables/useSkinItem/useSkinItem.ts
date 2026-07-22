import type { SkinItemProps } from './types';
import { useCurrenciesStore } from '@/store/currencyStore';
import { SKINS_LOCALIZED } from '@/utils';
import { formatCompact } from '@/utils/textFormatters';
import { parsePhaseToPhaseKey, parseSkinName, removeSizeFromImage } from './model';

export const useSkinItem = (props: SkinItemProps) => {
  const currencyStore = useCurrenciesStore();
  const isSkinLocalized = inject(SKINS_LOCALIZED);

  const { type = '', name = '' } = parseSkinName(props.item.name, props.item.phase);

  const isStatTrack = type.toLowerCase().includes('stattrak');
  const isSouvenir = type.toLowerCase().includes('souvenir');

  const skinType = computed(() => {
    if (!props.item?.steam_price?.localized_name || !isSkinLocalized?.value) return type || props.item?.steam_price?.type || '';
    return parseSkinName(props.item.steam_price.localized_name, props.item.phase).type || props.item?.steam_price?.type || '';
  });

  const skinName = computed(() => {
    if (!props.item?.steam_price?.localized_name || !isSkinLocalized?.value) return name;
    return parseSkinName(props.item.steam_price.localized_name, props.item.phase).name || '';
  });

  const phase = parsePhaseToPhaseKey(props.item.phase);

  const price = computed(() => currencyStore.calculatePrice(props.item.price));
  const steamPrice = computed(() => currencyStore.calculatePrice(props.item.steam_price.average));

  const image = removeSizeFromImage(props.item.image);

  const exterior = props.item.exterior;
  const rarityColor = props.item?.steam_price?.rarity_color;
  const float = props.item.float || 0;
  const offersCount = formatCompact(props.item.offer_count);

  return {
    isStatTrack,
    isSouvenir,
    skinType,
    skinName,
    phase,
    price,
    steamPrice,
    image,

    exterior,
    rarityColor,
    float,
    offersCount,
  };
};
