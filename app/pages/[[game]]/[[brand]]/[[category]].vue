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

const { loading, fetchSkins } = useSkinsList();
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

      <span class="font-12-n">
        {{ loading ? 'Items loading' : 'Items loaded' }}
      </span>
    </h1>

    <NuxtLinkLocale
      v-if="filterStore.selectedGame === 'csgo'"
      to="/knives/karambit"
    >
      Karambit
    </NuxtLinkLocale>

    <div v-if="$route.params.brand">
      brand: {{ $route.params.brand }}
    </div>

    <div v-if="$route.params.category">
      category: {{ $route.params.category }}
    </div>

    <pre>
      {{ filterStore.filterQueries }}
    </pre>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
