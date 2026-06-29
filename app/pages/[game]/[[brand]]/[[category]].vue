<script setup lang="ts">
import { useCatalogFilterStore } from '@/store/catalogFilterStore';

const $route = useRoute();
const filterStore = useCatalogFilterStore();
</script>

<template>
  <div class="page-wrapper">
    <h1> Main page </h1>

    <div>
      game: {{ $route.params.game || 'csgo' }}
    </div>

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
