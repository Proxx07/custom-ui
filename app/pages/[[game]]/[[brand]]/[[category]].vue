<script setup lang="ts">
import type { RouteLocationNormalizedGeneric } from 'vue-router';
import { useSkinsList } from '@/composables/useSkinsList';
import { useCatalogFilterStore } from '@/store/catalogFilterStore';

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

const { list, loading, fetchSkins } = useSkinsList();
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
</script>

<template>
  <div class="page-wrapper">
    <h1>
      Main page

      <NuxtLinkLocale v-if="filterStore.selectedGame === 'csgo'" to="/knives/karambit" class="font-12-n">
        Karambit
      </NuxtLinkLocale>
    </h1>

    <div v-if="loading">
      Loading ....
    </div>

    <div v-if="!loading" class="list">
      <div v-for="item in list" :key="item.item_id" class="skin">
        <div class="image-wrapper">
          <img :src="item.image" :alt="item.name">
        </div>
        <div class="font-14-b">
          {{ item.name }}
        </div>
        {{ item.price }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  margin-bottom: 2rem;
}
.page-wrapper {
  display: flex;
  flex-direction: column;
}

.list {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1.2rem;
  max-width: 100%;
  .skin {
    max-width: 100%;
    .image-wrapper {
      width: 100%;
      aspect-ratio: 4/3;
      font-size: 0;
    }
    img {
      max-width: 100%;
      aspect-ratio: 4/3;
    }
  }
}
</style>
