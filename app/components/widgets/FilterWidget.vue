<script setup lang="ts">
import type { ICurrency } from '@/composables/useCurrencies';
import { bestPrice } from '@/assets/icons/general';
import {
  FilterAccordion,
  FilterCollections,
  FilterColors, FilterDelivery,
  FilterFade,
  FilterGames,
  FilterPhase,
  FilterPrice,
  FilterRarities,
  FilterSortSelect,
  FilterWear,
} from '@/components/filter';
import { RadioButton, Tooltip, VIcon } from '@/components/ui';
import {
  AGENT_RARITIES,
  DOTA_ITEM_QUALITIES,
  DOTA_ITEM_RARITIES,
  ITEM_RARITIES,
  STICKER_RARITIES,
} from '@/composables/useItemRarities';
import { useCatalogFilterStore } from '@/store/catalogFilterStore';
import { capitalizeFirstLetter } from '@/utils';

defineProps<{
  selectedPricePreview: string
  selectedFloatPreview: string
  selectedExteriorsPreview: string
  deliveryTimePreview: string
  raritiesPreview: string
  selectedFadePreview: string
  statTrackPreview: string
  phasePreview: string
  qualitiesPreview: string

  selectedCurrency: ICurrency

  loading: boolean

  sortSelectEnabled?: boolean
  isCatalog?: boolean
}>();

const filterStore = useCatalogFilterStore();

const { t } = useI18n();

const bestPriceOnlyText = computed<string>(() => {
  return capitalizeFirstLetter(t('only', { text: t('bestPrice') }).toLowerCase());
});
</script>

<template>
  <div class="filter-widget">
    <FilterSortSelect
      v-if="sortSelectEnabled"
      v-model:order="filterStore.order"
      v-model:sort="filterStore.sort"
      :game="filterStore.selectedGame"
      :is-catalog="Boolean(isCatalog)"
    />

    <FilterAccordion :title="t('games')" opened>
      <FilterGames :loading="loading" />
    </FilterAccordion>
    <FilterAccordion :title="t('price')" opened>
      <template v-if="selectedPricePreview" #slotForClosed>
        <div class="flex gap items-center">
          <Tooltip
            v-if="filterStore.onlyBestPrice"
            :text="bestPriceOnlyText"
            position="right"
            class="fz-0 cursor-pointer"
            size="s"
          >
            <VIcon :size="20" :icon="bestPrice" color="best-price" />
          </Tooltip>
          {{ selectedPricePreview }}
        </div>
      </template>
      <FilterPrice
        v-model:min="filterStore.minPrice"
        v-model:max="filterStore.maxPrice"
        v-model:best-price="filterStore.onlyBestPrice"
        :best-price-enabled="filterStore.selectedGame === 'csgo'"
        :currency-symbol="selectedCurrency.symbol"
        :best-price-text="bestPriceOnlyText"
      />
    </FilterAccordion>

    <FilterAccordion v-if="filterStore.selectedGame === 'csgo'" :title="t('wear')" opened>
      <template #slotForClosed>
        {{ `${selectedExteriorsPreview} ${selectedFloatPreview ? ' / ' : ''}` }} {{ selectedFloatPreview }}
      </template>
      <FilterWear
        v-model:min="filterStore.minFloat"
        v-model:max="filterStore.maxFloat"
        v-model:exterior="filterStore.exterior"
        @update:min="filterStore.updateExteriorsByFloat"
        @update:max="filterStore.updateExteriorsByFloat"
        @update:exterior="filterStore.resetFloats"
      />
    </FilterAccordion>

    <FilterAccordion v-if="filterStore.selectedGame === 'csgo'" :title="t('delivery_time')" opened>
      <template #slotForClosed>
        {{ deliveryTimePreview }}
      </template>

      <FilterDelivery
        v-model="filterStore.deliveryTime"
      />
    </FilterAccordion>

    <FilterAccordion v-if="filterStore.selectedGame === 'csgo'" title="StatTrak">
      <template #slotForClosed>
        {{ statTrackPreview }}
      </template>
      <div class="flex-col gap">
        <RadioButton v-model="filterStore.statTrack" :value="null" :label="t('any')" />
        <RadioButton v-model="filterStore.statTrack" :value="1" :label="`${t('only')} StatTrak`" />
        <RadioButton v-model="filterStore.statTrack" :value="0" :label="`${t('without')} StatTrak`" />
      </div>
    </FilterAccordion>

    <FilterAccordion v-if="filterStore.selectedGame === 'csgo'" :title="t('color')">
      <template v-if="filterStore.color" #slotForClosed>
        {{ t(`colors.${filterStore.color}`) }}
      </template>
      <FilterColors
        v-model="filterStore.color"
      />
    </FilterAccordion>

    <FilterAccordion v-if="filterStore.selectedGame === 'dota2'" :title="t('quality')">
      <template #slotForClosed>
        {{ qualitiesPreview }}
      </template>
      <FilterRarities
        v-model="filterStore.quality"
        :rarities-list="DOTA_ITEM_QUALITIES"
      />
    </FilterAccordion>

    <FilterAccordion v-if="filterStore.selectedGame === 'csgo' || filterStore.selectedGame === 'dota2'" :title="t('rarity')">
      <template #slotForClosed>
        {{ raritiesPreview }}
      </template>
      <FilterRarities
        v-model="filterStore.rarities"
        :rarities-list="filterStore.selectedGame === 'csgo' ? ITEM_RARITIES : DOTA_ITEM_RARITIES"
        :additional-rarities="filterStore.selectedGame !== 'csgo' ? [] : [
          { title: 'Agent rarity', list: AGENT_RARITIES },
          { title: 'Sticker & patch rarity', list: STICKER_RARITIES },
        ]"
      />
    </FilterAccordion>

    <FilterAccordion v-if="filterStore.selectedGame === 'csgo'" title="Fade">
      <template #slotForClosed>
        {{ selectedFadePreview }}
      </template>
      <FilterFade
        v-model:min="filterStore.fadeMin"
        v-model:max="filterStore.fadeMax"
      />
    </FilterAccordion>

    <FilterAccordion v-if="filterStore.selectedGame === 'csgo'" :title="t('collections')">
      <template #slotForClosed>
        {{ filterStore.collection }}
      </template>
      <FilterCollections
        v-model="filterStore.collection"
      />
    </FilterAccordion>

    <FilterAccordion v-if="filterStore.selectedGame === 'csgo'" :title="t('phase')">
      <template #slotForClosed>
        {{ phasePreview }}
      </template>
      <FilterPhase
        v-model="filterStore.phase"
      />
    </FilterAccordion>
  </div>
</template>

<style scoped lang="scss">
.filter-widget {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
</style>
