<script setup lang="ts">
import { useSkinsList } from '@/composables/useSkinsList';
import { useCatalogFilterStore } from '@/store/catalogFilterStore';

const $route = useRoute();
const filterStore = useCatalogFilterStore();

const { loading, fetchSkins } = useSkinsList();

definePageMeta({
  layout: {
    name: 'default',
    props: {
      showSidebar: true,
    },
  },
});

await useLazyAsyncData(`items-${filterStore.selectedGame}-${$route.params.brand}-${$route.params.category}`, async () => {
  await fetchSkins(filterStore.selectedGame, filterStore.filterQueries);
  return true;
});

const stopSkinsFetchWatcher = watch(
  () => $route.query,
  () => fetchSkins(filterStore.selectedGame, filterStore.filterQueries),
  { flush: 'post' },
);

const getRouteBaseName = useRouteBaseName();

onBeforeMount(filterStore.writeToRoute);

onBeforeRouteLeave((to, from, next) => {
  if (getRouteBaseName(to)?.toString().includes('catalog')) {
    stopSkinsFetchWatcher();
    filterStore.resetStoreFilter();
  }
  next();
});

onBeforeRouteUpdate((to, from, next) => {
  if ((to.params.brand !== from.params.brand) || (to.params.category !== from.params.category)) {
    stopSkinsFetchWatcher();
    filterStore.resetStoreFilter();
  }
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
      to="/knives/kerambit"
    >
      Kerambit
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
