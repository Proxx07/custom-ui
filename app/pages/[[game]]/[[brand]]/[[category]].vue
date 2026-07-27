<script setup lang="ts">
import type { RouteLocationNormalizedGeneric } from 'vue-router';
import { addToCart } from '@/assets/icons/actions';
import { steam } from '@/assets/icons/logos';
import { ListGridSize } from '@/components/globalSelects';
import { CatalogList } from '@/components/navigations';
import { ListGrid, MarketplaceSkeleton, SkinCard, SkinImage, SkinType } from '@/components/skin';
import { Button, DotLoader, VIcon } from '@/components/ui';
import { useCardSize } from '@/composables/UI';
import { SKIN_IMAGE_ASPECT_RATIO } from '@/composables/useSkinItem';
import { MARKETPLACE_SKIN_IMAGES_QUERY, useSkinsList } from '@/composables/useSkinsList';
import { useCatalogFilterStore } from '@/store/catalogFilterStore';
import { useCurrenciesStore } from '@/store/currencyStore';

definePageMeta({
  middleware: [
    function (to, from) {
      const nuxtApp = useNuxtApp();
      if (import.meta.server || nuxtApp.isHydrating || !from.name) return true;
      const routeBaseName = useRouteBaseName();
      if (!routeBaseName(from) || routeBaseName(from) === 'game-brand-category') return true;
      useCatalogFilterStore().syncFromRoute(to.query);
    },
  ],

  layout: {
    name: 'default',
    props: {
      showSidebar: true,
    },
  },
});

const currencyStore = useCurrenciesStore();

const {
  list, loading, hasMore,
  fetchSkins, loadMoreSkins,
} = useSkinsList();

const { locale } = useI18n();

const $route = useRoute();
const filterStore = useCatalogFilterStore();

await useLazyAsyncData(
  `items-${filterStore.selectedGame}-${$route.params.brand}-${$route.params.category}-${locale.value}`,
  async () => {
    await fetchSkins(filterStore.selectedGame, filterStore.filterQueries);
    return true;
  },
);

const stopQueryWatcher = watch(
  () => $route.query,
  () => fetchSkins(filterStore.selectedGame, filterStore.filterQueries),
  { flush: 'post' },
);

const intersectionTarget = ref<HTMLDivElement>();
const { stop: stopIntersection } = useIntersectionObserver(intersectionTarget, ([entry]) => {
  if (!entry?.isIntersecting) return;
  loadMoreSkins(filterStore.selectedGame, filterStore.filterQueries);
});

const getRouteBaseName = useRouteBaseName();
const routeRestFilter = (to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric) => {
  const isRoutesSimilar = getRouteBaseName(from) === getRouteBaseName(to);
  const isParamsDifferent = from.params.brand !== to.params.brand || from.params.category !== to.params.category || from.params.game !== to.params.game;
  if (!isRoutesSimilar || isParamsDifferent) {
    filterStore.resetStoreFilter(false);
    stopQueryWatcher();
  }
};

onBeforeRouteLeave((to, from, next) => {
  routeRestFilter(to, from);
  next();
});

onBeforeRouteUpdate((to, from, next) => {
  routeRestFilter(to, from);
  next();
});

onBeforeUnmount(stopIntersection);

const { cardSize, nameFontsBySize } = useCardSize();
</script>

<template>
  <div class="page-wrapper">
    <CatalogList />
    <div class="text-right">
      <ListGridSize v-model="cardSize" />
    </div>

    <div v-if="!loading && !list.length">
      <div class="font-32-sb text-center">
        ¯\_(ツ)_/¯
      </div>
    </div>

    <ListGrid
      :size="cardSize"
      :loading="loading"
      :style="{ '--skin-padding': cardSize === 'small' ? '12px' : '16px' }"
    >
      <SkinCard
        v-for="(item, index) in list"
        :key="item.item_id"
        :item="item"
        :card-size="cardSize"
        background="surface-container"
        hover-background="surface-high-container"
      >
        <template #default="{ image, skinName, rarityColor, steamPrice, price, offersCount, skinType, souvenir, statTrack }">
          <div class="skin-inner">
            <div class="flex items-center gap color-on-surface-secondary">
              {{ offersCount }}
              <div
                v-if="steamPrice"
                class="flex items-center gap-1 ml-auto"
                :class="cardSize === 'small' ? 'font-12-n' : 'font-14-n'"
              >
                <VIcon :icon="steam" :size="20" />
                <DotLoader
                  v-if="currencyStore.currenciesListLoading && currencyStore.currency !== 'USD'"
                  :count="5"
                />
                <template v-else>
                  {{ currencyStore.priceToCurrency(steamPrice, false) }}
                </template>
              </div>
            </div>

            <SkinImage
              :image="image"
              :card-size="cardSize"
              :game="item.game"
              :image-query="MARKETPLACE_SKIN_IMAGES_QUERY"
              :rarity-color="rarityColor"
              rarity-image="hex"
              :alt="skinName"
              :loading="index < 10 ? 'eager' : 'lazy'"
            />

            <SkinType
              v-if="skinType"
              :label="skinType"
              :is-souvenir="souvenir"
              :is-stat-trak="statTrack"
              :card-size="cardSize"
              :color="item.game === 'dota2' ? rarityColor : undefined"
            />

            <div :class="[nameFontsBySize[cardSize]]">
              {{ skinName }}
            </div>

            <div class="font-16-m price">
              {{ currencyStore.selectedCurrency.symbol }}
              <DotLoader
                v-if="currencyStore.currenciesListLoading && currencyStore.currency !== 'USD'"
                :count="5"
              />
              <template v-else>
                {{ currencyStore.priceToCurrency(price, false) }}
              </template>
            </div>

            <div class="buttons">
              <Button
                :icon-right="addToCart"
                severity="tertiary"
                variant="outlined"
                :size="cardSize === 'large' ? 'm' : 's'"
              />

              <Button
                label="Buy now"
                class="justify-center"
                :size="cardSize === 'large' ? 'm' : 's'"
              />
            </div>
          </div>
        </template>
      </SkinCard>
      <template #skeletons>
        <MarketplaceSkeleton
          v-for="i in 40"
          :key="i"
          class="skin-inner bg-surface-container"
          :ratio="1 / SKIN_IMAGE_ASPECT_RATIO[filterStore.selectedGame]"
          :skin-number="i"
          :card-size="cardSize"
        />
      </template>
    </ListGrid>

    <client-only>
      <div
        v-if="hasMore"
        ref="intersectionTarget"
        style="height: 1px; opacity: 0; pointer-events: none; margin-top: -200px"
      />
    </client-only>
  </div>
</template>

<style scoped lang="scss">
h1 {
  margin-bottom: 2rem;
}
.page-wrapper {
  display: flex;
  flex-direction: column;
  gap: .8rem;
}

.gap-1 { gap: 4px }

.skin-inner {
  display: flex;
  flex-direction: column;
  padding: var(--skin-padding);
  gap: 4px;
  height: 100%;
  @include media-max($mobile) {
    padding: 12px;
  }
  .price {
    margin-top: auto;
    padding-top: .6rem;
  }

  .buttons {
    padding-top: 1.2rem;
    gap: 4px;
    display: grid;
    grid-template-columns: auto 1fr;
  }
}
</style>
