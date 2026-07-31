<script setup lang="ts">
import type { RouteLocationNormalizedGeneric } from 'vue-router';
import { addToCart, filter, itemType, search } from '@/assets/icons/actions';
import { sorting1 } from '@/assets/icons/arrows';
import { loader } from '@/assets/icons/general';
import { steam } from '@/assets/icons/logos';
import { ListGridSize } from '@/components/globalSelects';
import { CatalogList } from '@/components/navigations';
import { ListGrid, MarketplaceSkeleton, SkinCard, SkinFloat, SkinImage, SkinType } from '@/components/skin';
import { Button, DotLoader, DropDown, Input, VIcon } from '@/components/ui';
import { useCardSize } from '@/composables/UI';
import { SKIN_IMAGE_ASPECT_RATIO } from '@/composables/useSkinItem';
import {
  filteredListOrderData,
  MARKETPLACE_SKIN_IMAGES_QUERY,
  useSkinsList,
} from '@/composables/useSkinsList';
import { useCatalogFilterStore } from '@/store/catalogFilterStore';
import { useCurrenciesStore } from '@/store/currencyStore';
import { useDrawersStore } from '@/store/drawersState';
import { formatCompact } from '@/utils/textFormatters';

definePageMeta({
  pageTransition: false,
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

const isCatalog = computed(() => Boolean($route.params.brand || $route.params.category));

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
  const isParamsDifferent = from.params.brand !== to.params.brand
    || from.params.category !== to.params.category
    || from.params.game !== to.params.game;
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

const drawerStore = useDrawersStore();
const { cardSize, nameFontsBySize } = useCardSize();
const [folderCollapsed, toggleFoldersCollapsed] = useToggle();
</script>

<template>
  <div class="page-wrapper">
    <CatalogList class="catalog-list" :mobile-folders-collapsed="folderCollapsed" />
    <div class="page-top">
      <div class="breadcrumbs">
        {BREADCRUMBS}
      </div>
      <div class="filter-wrapper">
        <Input v-model="filterStore.search" placeholder="Search" fluid>
          <template #prefix>
            <VIcon :icon="loading ? loader : search" style="margin-left: 1.4rem" />
          </template>
        </Input>

        <div class="sort-wrapper">
          <Button
            bg-color="surface-high-container"
            hover-bg-color="surface-highest-container"
            :icon-right="sorting1"
            :rotate-right-icon="filterStore.sort === 'ASC'"
            right-icon-no-fill
            :disabled="filterStore.order === 'advised'"
            class="sort-button"
            @click="filterStore.toggleSort"
          />
          <DropDown
            v-model="filterStore.order"
            :items="filteredListOrderData(filterStore.selectedGame, isCatalog)"
            class="order-dropdown"
            @update:model-value="$event === 'advised' && filterStore.sort !== 'DESC' ? filterStore.toggleSort() : {}"
          >
            <template #targetInner="{ selected }">
              <span class="capitalize-first-letter">{{ selected }}</span>
            </template>
            <template #itemInner="{ item }">
              <span class="capitalize-first-letter">{{ item }}</span>
            </template>
          </DropDown>
        </div>

        <ListGridSize v-model="cardSize" class="hide-down-tablet" />

        <Button
          severity="tertiary"
          border-color="outline"
          bg-color="surface-high-container"
          no-hover-bg
          class="hide-up-tablet"
          :icon-right="itemType"
          @click="toggleFoldersCollapsed(!folderCollapsed)"
        />

        <Button
          severity="tertiary"
          border-color="outline"
          bg-color="surface-high-container"
          no-hover-bg
          class="hide-up-laptop-s"
          :icon-right="filter"
          @click="drawerStore.showAsideDrawer"
        />
      </div>
    </div>

    <div v-if="!loading && !list.length" class="empty-text">
      <div class="font-32-sb text-center">
        ¯\_(ツ)_/¯
      </div>
    </div>

    <ListGrid
      :size="cardSize"
      :loading="loading"
      :style="{ '--skin-padding': cardSize === 'small' ? '12px' : '16px' }"
      class="list-wrapper"
    >
      <SkinCard
        v-for="(item, index) in list"
        :key="item.id"
        :item="item"
        :card-size="cardSize"
        background="surface-container"
        hover-background="surface-high-container"
      >
        <template #default="{ image, skinName, rarityColor, steamPrice, price, lowestPrice, offersCount, skinType, souvenir, statTrack, float, floatPercent, exterior }">
          <div class="skin-inner">
            <div class="flex items-center gap color-on-surface-secondary" style="min-height: 2rem">
              <span v-if="offersCount" class="offer-count">
                x{{ offersCount }}
              </span>
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
              :fetchpriority="index < 10 ? 'high' : undefined"
            />

            <div v-if="!isCatalog" class="flex font-12-n">
              <div class="color-on-surface-tertiary">
                {{ exterior }}
              </div>
              <div class="ml-auto" />
              {{ float ? float : '' }}
            </div>

            <SkinFloat
              v-if="!isCatalog"
              :float="float"
              :percent="floatPercent"
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

            <div v-if="!isCatalog" class="font-16-m price">
              {{ currencyStore.selectedCurrency.symbol }}
              <DotLoader
                v-if="currencyStore.currenciesListLoading && currencyStore.currency !== 'USD'"
                :count="5"
              />
              <template v-else>
                {{ currencyStore.priceToCurrency(price, false) }}
              </template>
            </div>

            <div v-if="!isCatalog" class="buttons">
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
            <div v-else class="price-range">
              <DotLoader v-if="currencyStore.currenciesListLoading && currencyStore.currency !== 'USD'" :count="5" />
              <template v-else>
                {{ currencyStore.selectedCurrency.symbol }} {{ formatCompact(lowestPrice) }} - {{ currencyStore.selectedCurrency.symbol }} {{ formatCompact(price) }}
              </template>
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
        class="intersection"
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

.intersection {
  height: 1px;
  opacity: 0;
  pointer-events: none;
  margin-top: -200px;
}

.gap-1 { gap: 4px };

.skin-inner {
  display: flex;
  flex-direction: column;
  padding: var(--skin-padding);
  gap: 4px;
  height: 100%;
  @include media-max($mobile) {
    padding: 12px;
  }

  .offer-count {
    font: var(--font-12-n);
    background: var(--surface-highest-container);
    color: var(--on-surface-tertiary);
    padding: .1rem .4rem;
    border-radius: var(--radius-xs);
  }

  .price {
    margin-top: auto;
    padding-top: .6rem;
  }

  .float {
    margin-bottom: .6rem;
  }

  .buttons {
    padding-top: 1.2rem;
    gap: 4px;
    display: grid;
    grid-template-columns: auto 1fr;
  }

  .price-range {
    margin-top: auto;
    padding-top: 1.2rem;
  }
}

.page-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
  align-items: center;
  @include media-max($tablet) {
    order: -1;
  }
  @include media-max($tablet-s) {
    grid-template-columns: 1fr;
  }
  @include media-max($mobile) {
    padding: 0 var(--container-padding-x);
  }
}

.filter-wrapper {
  display: flex;
  gap: .6rem;
  justify-content: flex-end;
  text-align: right;
  .sort-wrapper {
    display: flex;
    gap: .1rem;
    flex-shrink: 0;
    .sort-button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      :deep(.icon) {
        transition: none;
      }
    }
  }
  .order-dropdown {
    min-width: 165px;
    :deep(.w-button) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  :deep(button) {
    flex-shrink: 0;
  }
}
</style>
