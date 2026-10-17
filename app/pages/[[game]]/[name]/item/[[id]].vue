<script setup lang="ts">
import type { BreadCrumbsItem } from '@/composables/UI';
import { BreadCrumbs } from '@/components/navigations';
import { useGames } from '@/composables/useGames';
import { useSkinData } from '@/composables/useSkinPage';
// import { useModuleI18n } from '@/composables/useModuleI18n';

const $route = useRoute();
const { selectedGame } = useGames();
// await useModuleI18n(`${selectedGame.value}.catalog`);
const { loading, fetchItem } = useSkinData();
const breadCrumbsList = computed<BreadCrumbsItem[]>(() => {
  return [];
});

await useLazyAsyncData(`skin-page-${selectedGame.value}-${$route.params.name}-${$route.params.id || ''}`,
  async () => {
    await fetchItem({
      ...($route.params.id && { id: $route.params.id as string }),
      name: $route.params.name as string,
      game: selectedGame.value,
    });
    return true;
  },
);
</script>

<template>
  <div>
    <div v-if="!loading" class="skin-page-wrapper">
      <BreadCrumbs :list="breadCrumbsList" />
      <h1>Item page</h1>
      <br>
      Game: {{ selectedGame }}
      <br>
      Name: {{ $route.params.name }}
      <br>
      Id: {{ $route.params.id }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.skin-page-wrapper {
  max-width: 1315px;
  margin: 0 auto;
}
</style>
