import type { DeliveryTimeTypes } from '@/composables/useDeliveryTime';
import type { PhaseQueryTypes } from '@/composables/useItemFades';
import type { FilterColorType } from '@/utils';
import { useRoute } from 'vue-router';
import { GAMES_LIST, type gameTypes } from '@/composables/useGames';

import { useRouteFilters } from '@/composables/useRouteFilters';
import { EXTERIORS_LIST, type ExteriorTypes, getExteriorListFromFloatRange } from '@/composables/useSkinItem';

export const useCatalogFilterStore = defineStore('catalog-filter', () => {
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
    query: filterQueries,
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
    fadeMin: { key: 'fade_min', parse: 'number', default: 80 },
    fadeMax: { key: 'fade_max', parse: 'number', default: 100 },
    phase: { key: 'phase', parse: 'array', default: [] as PhaseQueryTypes[] },
  });

  const selectedGame = computed<gameTypes>(() => {
    if (typeof $route.params.game !== 'string' || !GAMES_LIST.includes($route.params.game as gameTypes)) return 'csgo';
    return $route.params.game as gameTypes;
  });
  // $route.params.brand
  // $route.params.category

  const updateExteriorsByFloat = useDebounceFn(() => {
    const exteriorsArray = getExteriorListFromFloatRange(minFloat.value, maxFloat.value);
    exterior.value = exteriorsArray.length === EXTERIORS_LIST.length ? [] : exteriorsArray;
  }, 300);

  const resetFloats = () => {
    minFloat.value = 0;
    maxFloat.value = 1;
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
    resetFloats,
    updateExteriorsByFloat,
  };
});
