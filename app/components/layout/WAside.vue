<script setup lang="ts">
import { FilterBadgesWrapper } from '@/components/filter';
import { Drawer } from '@/components/ui';
import { FilterWidget } from '@/components/widgets';

import { useCurrencies } from '@/composables/useCurrencies';
import { useCatalogFilterStore } from '@/store/catalogFilterStore';
import { useDrawersStore } from '@/store/drawersState';

const { t } = useI18n();

const { selectedCurrency } = useCurrencies();
const drawersStore = useDrawersStore();
const filterStore = useCatalogFilterStore();

const selectedPricePreview = computed<string>(() => {
  if (!filterStore.minPrice && !filterStore.maxPrice) return '';
  return `${selectedCurrency.value.symbol} ${filterStore.minPrice} - ${selectedCurrency.value.symbol} ${filterStore.maxPrice}`;
});

const selectedFloatPreview = computed<string>(() => {
  if (filterStore.minFloat === 0 && filterStore.maxFloat === 1) return '';
  return `${filterStore.minFloat} - ${filterStore.maxFloat}`;
});

const selectedExteriorsPreview = computed<string>(() => {
  return filterStore.exterior.reduce((acc, curr) => `${acc ? `${acc},` : acc} ${t(`exterior.${curr}`)}`, '');
});

const deliveryTimePreview = computed<string>(() => {
  return filterStore.deliveryTime.reduce((acc, curr) => `${acc ? `${acc},` : acc} ${t(`delivery.${curr}`)}`, '');
});

const qualitiesPreview = computed<string>(() => {
  return filterStore.quality.reduce((acc, curr) => `${acc ? `${acc},` : acc} ${t(`rarities.${curr}`)}`, '');
});

const raritiesPreview = computed<string>(() => {
  return filterStore.rarities.reduce((acc, curr) => `${acc ? `${acc},` : acc} ${curr}`, '');
});

const selectedFadePreview = computed<string>(() => {
  if (filterStore.fadeMin === 80 && filterStore.fadeMax === 100) return '';
  return `${filterStore.fadeMin}% - ${filterStore.fadeMax}%`;
});

const statTrackPreview = computed<string>(() => {
  if (filterStore.statTrack === 0) return `${t('without')} StatTrak`;
  if (filterStore.statTrack === 1) return `${t('only')} StatTrak`;
  return '';
});

const phasePreview = computed<string>(() => {
  return filterStore.phase.reduce((acc, curr) => `${acc ? `${acc},` : acc} ${t(`phases.${curr}`)}`, '');
});
</script>

<template>
  <aside>
    <FilterBadgesWrapper
      :price-preview="selectedPricePreview"
      :float-preview="selectedFloatPreview"
      :stat-track-preview="statTrackPreview"
      :fade-preview="selectedFadePreview"
    />

    <FilterWidget
      :selected-price-preview="selectedPricePreview"
      :selected-float-preview="selectedFloatPreview"
      :selected-exteriors-preview="selectedExteriorsPreview"
      :delivery-time-preview="deliveryTimePreview"
      :rarities-preview="raritiesPreview"
      :qualities-preview="qualitiesPreview"
      :selected-fade-preview="selectedFadePreview"
      :stat-track-preview="statTrackPreview"
      :phase-preview="phasePreview"
      :selected-currency="selectedCurrency"
    />

    <client-only>
      <Drawer
        v-model="drawersStore.asideDrawer"
      >
        <FilterWidget
          :selected-price-preview="selectedPricePreview"
          :selected-float-preview="selectedFloatPreview"
          :selected-exteriors-preview="selectedExteriorsPreview"
          :delivery-time-preview="deliveryTimePreview"
          :rarities-preview="raritiesPreview"
          :qualities-preview="qualitiesPreview"
          :selected-fade-preview="selectedFadePreview"
          :stat-track-preview="statTrackPreview"
          :phase-preview="phasePreview"
          :selected-currency="selectedCurrency"
        />
      </Drawer>
    </client-only>
  </aside>
</template>

<style scoped lang="scss">
aside {
  position: sticky;
  top: calc(var(--header-height) + var(--gap));
  height: var(--aside-height);
  overflow-y: auto;
  background: var(--surface-container);
  padding: 1rem 2rem 6rem;
  transition: var(--transition-slow);

  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  @include media-max($tablet) {
    display: none;
  }
}
</style>
