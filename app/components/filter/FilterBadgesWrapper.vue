<script setup lang="ts">
import type { DeliveryTimeTypes } from '@/composables/useDeliveryTime';
import type { IFilterSelectedItem } from '@/composables/useRouteFilters';
import { cross } from '@/assets/icons/actions';
import { refresh } from '@/assets/icons/arrows';
import { Button, VIcon } from '@/components/ui';
import { type ExteriorTypes, setFilterBadgeItemFromTypes } from '@/composables/useSkinItem';
import { useCatalogFilterStore } from '@/store/catalogFilterStore';

defineProps<{
  pricePreview: string
  floatPreview: string
  statTrackPreview: string
  fadePreview: string
}>();

const $route = useRoute();
const { t } = useI18n();

const [badgesRerender, toggleBadgesRerender] = useToggle();
const badgesList = ref<HTMLElement>();

const filterStore = useCatalogFilterStore();

const selectedExteriors = computed<IFilterSelectedItem<ExteriorTypes>[]>(() => {
  return filterStore.exterior.map(exterior => setFilterBadgeItemFromTypes(exterior, 'exterior'));
});

const selectedDeliveries = computed<IFilterSelectedItem<DeliveryTimeTypes>[]>(() => {
  return filterStore.deliveryTime.map(delivery => setFilterBadgeItemFromTypes(delivery, 'delivery'));
});

const selectedQuality = computed<IFilterSelectedItem<string>[]>(() => {
  return filterStore.quality.map(quality => setFilterBadgeItemFromTypes(quality, 'rarities'));
});

const selectedRarities = computed<IFilterSelectedItem<string>[]>(() => {
  return filterStore.rarities.map(rarity => setFilterBadgeItemFromTypes(rarity));
});

const selectedPhases = computed(() => {
  return filterStore.phase.map(phase => setFilterBadgeItemFromTypes(phase, 'phases'));
});

const FilterElementsBadge = (props: { label: string, onClick: () => void }) => {
  return h(Button, {
    class: 'badge-button',
    severity: 'tertiary',
    padding: '0.3rem 0.3rem 0.3rem 0.5rem',
    label: props.label,
    size: 's',
    iconRight: cross,
    onClick: () => {
      toggleBadgesRerender();
      props.onClick();
    },
  });
};

const { height } = useElementBounding(badgesList);

const filterReseted = ref(false);

watch(filterReseted, (value) => {
  if (value) {
    setTimeout(() => {
      filterReseted.value = false;
    }, 1000);
  }
});
</script>

<template>
  <div class="badges-wrapper" :style="{ '--height': badgesList ? `${height}px` : 'auto' }">
    <div
      ref="badgesList"
      v-memo="[$route.query, badgesRerender]"
      class="badges-list"
    >
      <div class="filter-top">
        Filter items
        <Button
          variant="text"
          severity="tertiary"
          padding=".4rem"
          @click="() => {
            filterReseted = true;
            filterStore.resetStoreFilter();
          }"
        >
          <VIcon :icon="refresh" :class="[filterReseted && 'rotate-left-animation']" />
        </Button>
      </div>

      <FilterElementsBadge
        v-if="pricePreview"
        :label="pricePreview"
        @click="filterStore.resetPrice"
      />

      <FilterElementsBadge
        v-if="filterStore.onlyBestPrice"
        label="Best price only"
        @click="filterStore.resetField('onlyBestPrice')"
      />

      <FilterElementsBadge
        v-if="floatPreview"
        :label="floatPreview"
        @click="filterStore.resetFloats"
      />

      <FilterElementsBadge
        v-for="exterior in selectedExteriors"
        :key="exterior.value"
        :label="t(exterior.label)"
        @click="filterStore.removeSingleExterior(exterior.value)"
      />

      <FilterElementsBadge
        v-for="delivery in selectedDeliveries"
        :key="delivery.value"
        :label="t(delivery.label)"
        @click="filterStore.removeSingleDeliveryTime(delivery.value)"
      />

      <FilterElementsBadge
        v-if="statTrackPreview"
        :label="statTrackPreview"
        @click="filterStore.resetField('statTrack')"
      />

      <FilterElementsBadge
        v-if="filterStore.color"
        :label="t(`colors.${filterStore.color}`)"
        @click="filterStore.resetField('color')"
      />

      <FilterElementsBadge
        v-for="quality in selectedQuality"
        :key="quality.value"
        :label="t(quality.label)"
        @click="filterStore.removeSingleQuality(quality.value)"
      />

      <FilterElementsBadge
        v-for="rarity in selectedRarities"
        :key="rarity.value"
        :label="rarity.label"
        @click="filterStore.removeSingleRarity(rarity.value)"
      />

      <FilterElementsBadge
        v-if="fadePreview"
        :label="fadePreview"
        @click="filterStore.resetFade"
      />

      <FilterElementsBadge
        v-if="filterStore.collection"
        :label="filterStore.collection"
        @click="filterStore.resetField('collection')"
      />

      <FilterElementsBadge
        v-for="phase in selectedPhases"
        :key="phase.value"
        :label="t(phase.label)"
        @click="filterStore.removeSinglePhase(phase.value)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.badges-wrapper {
  height: var(--height);
  @include transition(height);
  .filter-top {
    display: none;
    width: 100%;
    gap: 1.2rem;
    font: var(--font-24-m);
    padding-bottom: 1.6rem;
    align-items: center;
    justify-content: space-between;
  }
  &:has(.badge-button) {
    .filter-top {
      display: flex;
    }
  }
}
.badges-list {
  display: flex;
  gap: .6rem;
  flex-wrap: wrap;

  :deep(.badge-button) {
    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
    &:hover {
      svg {
        transform: rotateZ(90deg);
      }
    }
  }
}
</style>
