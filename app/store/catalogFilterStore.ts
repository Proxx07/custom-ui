import type { DeliveryTimeTypes } from '@/composables/useDeliveryTime';
import type { PhaseQueryTypes } from '@/composables/useItemFades';
import type { IRarity } from '@/composables/useItemRarities';

import type { FilterColorType } from '@/utils';
import { useGames } from '@/composables/useGames';
import { useRouteFilters } from '@/composables/useRouteFilters';
import { EXTERIORS_LIST, type ExteriorTypes, getExteriorListFromFloatRange } from '@/composables/useSkinItem';

export const useCatalogFilterStore = defineStore('catalog-filter', () => {
  const { selectedGame } = useGames();
  const $route = useRoute();
  const {
    minPrice,
    maxPrice,
    onlyBestPrice,
    minFloat,
    maxFloat,
    exterior,
    deliveryTime,
    statTrack,
    color,
    rarities,
    fadeMin,
    fadeMax,
    phase,
    search,
    collection,
    quality,
    query,
    reset: resetStoreFilter,
    resetField,
    writeToRoute,
  } = useRouteFilters({
    minPrice: { key: 'min_price', parse: 'number', default: undefined },
    maxPrice: { key: 'max_price', parse: 'number', default: undefined },
    onlyBestPrice: { key: 'fair_price', parse: 'boolean', default: false, serialize: () => 1 },
    minFloat: { key: 'min_float', parse: 'number', default: 0 },
    maxFloat: { key: 'max_float', parse: 'number', default: 1 },
    exterior: { key: 'exterior', parse: 'array', default: [] as ExteriorTypes[] },
    deliveryTime: { key: 'time', parse: 'array', default: [] as DeliveryTimeTypes[] },
    statTrack: { key: 'stat_trak', parse: 'number', default: null },
    color: { key: 'color', parse: 'string', default: '' as FilterColorType },

    rarities: { key: 'rarity', parse: 'array', default: [] as string[] },
    quality: { key: 'quality', parse: 'array', default: [] as string[] },

    fadeMin: { key: 'fade_min', parse: 'number', default: 80 },
    fadeMax: { key: 'fade_max', parse: 'number', default: 100 },
    phase: { key: 'phase', parse: 'array', default: [] as PhaseQueryTypes[] },
    search: { key: 'search', parse: 'string', default: '' },
    collection: { key: 'collection', parse: 'string', default: '' },
  }, 1200);

  const filterQueries = computed(() => {
    return {
      ...query.value,
      ...($route.params.brand && { brand: $route.params.brand }),
      ...($route.params.category && { type: $route.params.category }),
    };
  });

  const updateExteriorsByFloat = () => {
    const exteriorsArray = getExteriorListFromFloatRange(minFloat.value, maxFloat.value);
    exterior.value = exteriorsArray.length === EXTERIORS_LIST.length ? [] : exteriorsArray;
  };

  const resetFloats = () => {
    resetField('minFloat');
    resetField('maxFloat');
  };

  const resetPrice = () => {
    resetField('minPrice');
    resetField('maxPrice');
  };

  const resetFade = () => {
    resetField('fadeMin');
    resetField('fadeMax');
  };

  const removeSingleExterior = (value: ExteriorTypes) => {
    exterior.value = exterior.value.filter(ext => ext !== value);
  };

  const removeSingleRarity = (value: IRarity['value']) => {
    rarities.value = rarities.value.filter(rarity => rarity !== value);
  };

  const removeSingleQuality = (value: IRarity['value']) => {
    quality.value = quality.value.filter(q => q !== value);
  };

  const removeSinglePhase = (value: PhaseQueryTypes) => {
    phase.value = phase.value.filter(ph => ph !== value);
  };

  const removeSingleDeliveryTime = (value: DeliveryTimeTypes) => {
    deliveryTime.value = deliveryTime.value.filter(delivery => delivery !== value);
  };

  return {
    minPrice,
    maxPrice,
    minFloat,
    maxFloat,
    selectedGame,
    onlyBestPrice,
    exterior,
    filterQueries,
    deliveryTime,
    statTrack,
    color,
    rarities,
    fadeMin,
    fadeMax,
    phase,
    search,
    collection,
    quality,

    resetField,
    removeSingleExterior,
    removeSingleRarity,
    removeSingleQuality,
    removeSinglePhase,
    removeSingleDeliveryTime,
    resetFloats,
    updateExteriorsByFloat,
    resetPrice,
    resetFade,
    writeToRoute,
    resetStoreFilter,
  };
});
