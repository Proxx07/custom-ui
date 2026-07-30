<script setup lang="ts">
import type { FloatProps } from './types';

const { percent } = defineProps<FloatProps>();

const leftValue = `${percent}%`;
</script>

<template>
  <div class="float" />
</template>

<style scoped lang="scss">
.float {
  width: 100%;
  height: 1px;
  background: var(--float-bg);
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: v-bind(leftValue);
    right: 0;
    top: 0;
    bottom: 0;
    background: var(--outline);
  }
}
</style>
