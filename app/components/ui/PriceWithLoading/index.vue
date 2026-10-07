<script setup lang="ts">
import type { PriceWithLoadingProps } from './types';
import DotLoader from '../Loaders/dotLoader.vue';

defineProps<PriceWithLoadingProps>();
</script>

<template>
  <div class="price-wrapper">
    <slot name="prepend" />
    <DotLoader
      v-if="loading"
      :count="5"
    />
    <slot v-else name="default">
      {{ price }}
    </slot>
  </div>
</template>

<style scoped lang="scss">
.price-wrapper {
  display: flex;
  align-items: center;
  gap: .4rem;
}
</style>
