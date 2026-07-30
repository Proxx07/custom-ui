import type { SkinItemProps } from './types';
import { useCurrenciesStore } from '@/store/currencyStore';
import { SKINS_LOCALIZED } from '@/utils';
import { formatCompact } from '@/utils/textFormatters';
import { getFloatPercent, parsePhaseToPhaseKey, parseSkinName, removeSizeFromImage } from './model';

export const useSkinItem = (props: SkinItemProps) => {
  const currencyStore = useCurrenciesStore();
  const isSkinLocalized = inject(SKINS_LOCALIZED);

  const { type = '', name = '' } = parseSkinName(props.item.name, props.item.phase);

  const isStatTrack = type.toLowerCase().includes('stattrak');
  const isSouvenir = type.toLowerCase().includes('souvenir');

  const skinType = computed(() => {
    if (!props.item.localized_name || !isSkinLocalized?.value) return type || props.item.type || '';
    return parseSkinName(props.item.localized_name, props.item.phase).type || props.item.type || '';
  });

  const skinName = computed(() => {
    if (!props.item.localized_name || !isSkinLocalized?.value) return name;
    return parseSkinName(props.item.localized_name, props.item.phase).name || '';
  });

  const phase = parsePhaseToPhaseKey(props.item.phase);

  const price = computed(() => currencyStore.calculatePrice(props.item.price));
  const steamPrice = computed(() => currencyStore.calculatePrice(props.item.steamPrice));

  const image = removeSizeFromImage(props.item.image);
  const offersCount = !props.item.offersCount ? '' : formatCompact(props.item.offersCount);

  const float = Number.parseFloat(props.item.float?.toFixed(7) || '0');
  const floatPercent = getFloatPercent(props.item.float);

  return {
    isStatTrack,
    isSouvenir,
    skinType,
    skinName,
    phase,
    price,
    steamPrice,
    image,
    float,
    offersCount,
    floatPercent,
  };
};
