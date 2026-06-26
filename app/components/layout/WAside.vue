<script setup lang="ts">
import {
  FilterAccordion,
  FilterColors,
  FilterDelivery, FilterFade,
  FilterGames,
  FilterPhase,
  FilterPrice,
  FilterRarities,
  FilterWear,
} from '@/components/filter';

import { RadioButton } from '@/components/ui';
import { useCurrencies } from '@/composables/useCurrencies';
import { AGENT_RARITIES, ITEM_RARITIES, STICKER_RARITIES } from '@/composables/useItemRarities';
import { useCatalogFilterStore } from '@/store/catalogFilterStore';

const { t } = useI18n();
const $router = useRouter();

const { selectedCurrency } = useCurrencies();
// const drawersState = useDrawersStore();
const filterStore = useCatalogFilterStore();

const setQueriesToRoute = useDebounceFn(() => {
  $router.replace({
    name: $router.currentRoute.value.name,
    params: $router.currentRoute.value.params,
    query: { ...filterStore.filterQueries },
  });
}, 300);

watch(() => filterStore.filterQueries, setQueriesToRoute);
</script>

<template>
  <aside>
    <FilterAccordion title="Games" opened>
      <FilterGames
        :current-game="filterStore.selectedGame"
      />
    </FilterAccordion>

    <FilterAccordion title="Price" opened>
      <FilterPrice
        v-model:min="filterStore.minPrice"
        v-model:max="filterStore.maxPrice"
        v-model:best-price="filterStore.onlyBestPrice"
        :best-price-enabled="filterStore.selectedGame === 'csgo'"
        :currency-symbol="selectedCurrency.symbol"
      />
    </FilterAccordion>

    <FilterAccordion title="Wear" opened>
      <FilterWear
        v-model:min="filterStore.minFloat"
        v-model:max="filterStore.maxFloat"
        v-model:exterior="filterStore.exterior"
        @update:min="filterStore.updateExteriorsByFloat"
        @update:max="filterStore.updateExteriorsByFloat"
        @update:exterior="filterStore.resetFloats"
      />
    </FilterAccordion>

    <FilterAccordion title="Delivery time" opened>
      <FilterDelivery
        v-model="filterStore.deliveryTime"
      />
    </FilterAccordion>

    <FilterAccordion title="StatTrak">
      <div class="flex-col gap">
        <RadioButton v-model="filterStore.statTrack" :value="null" :label="t('any')" />
        <RadioButton v-model="filterStore.statTrack" :value="1" :label="`${t('only')} StatTrak`" />
        <RadioButton v-model="filterStore.statTrack" :value="0" :label="`${t('without')} StatTrak`" />
      </div>
    </FilterAccordion>

    <FilterAccordion title="Color">
      <FilterColors
        v-model="filterStore.color"
      />
    </FilterAccordion>

    <FilterAccordion title="Rarity">
      <FilterRarities
        v-model="filterStore.rarities"
        :rarities-list="ITEM_RARITIES"
        :additional-rarities="filterStore.selectedGame !== 'csgo' ? [] : [
          { title: 'Agent rarity', list: AGENT_RARITIES },
          { title: 'Sticker & patch rarity', list: STICKER_RARITIES },
        ]"
      />
    </FilterAccordion>

    <FilterAccordion title="Fade">
      <FilterFade
        v-model:min="filterStore.fadeMin"
        v-model:max="filterStore.fadeMax"
      />
    </FilterAccordion>

    <FilterAccordion title="Phase">
      <FilterPhase v-model="filterStore.phase" />
    </FilterAccordion>

    <!--
    <client-only>
      <Drawer
        v-model="drawersState.asideDrawer"
      >
        <template #header="{ close }" />
        <template #default="{ close }" />
      </Drawer>
    </client-only>
     -->
  </aside>
</template>

<style scoped lang="scss">
aside {
  position: sticky;
  top: calc(var(--header-height) + var(--gap));
  height: var(--aside-height);
  overflow-y: auto;
  background: var(--surface-container);
  padding: .6rem 2rem 6rem;
  transition: var(--transition-slow);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  @include media-max($tablet) {
    display: none;
  }
}
</style>
