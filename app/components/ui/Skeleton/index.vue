<script setup lang="ts">
import type { SkeletonProps } from './types';
import { SKIN_PLACEHOLDERS_ENUM, SKIN_PLACEHOLDERS_LIST } from '@/composables/useSkinItem';

const { width = 'auto', height = 'auto', size, round, skin } = defineProps<SkeletonProps>();

const skeletonWidth = computed(() => size || width);
const skeletonHeight = computed(() => size || height);

const skinUrl = skin === undefined ? '' : `url("${SKIN_PLACEHOLDERS_ENUM[SKIN_PLACEHOLDERS_LIST[skin % SKIN_PLACEHOLDERS_LIST.length]!]}")`;
</script>

<template>
  <div
    class="skeleton"
    :class="[(round && !skin) && 'round', skinUrl && 'has-skin']"
    :style="{ '--skin-mask': skinUrl }"
  />
</template>

<style scoped lang="scss">
.skeleton {
  --fade-color: #{mix-color-transparent(var(--on-surface), 0.08)};
  position: relative;
  overflow: hidden;
  width: v-bind(skeletonWidth);
  height: v-bind(skeletonHeight);
  border-radius: var(--radius-m);

  color: var(--surface-high-container);
  background-color: var(--surface-high-container);

  background-image: repeating-linear-gradient(-45deg, transparent 0 35%, var(--fade-color) 50%, transparent 65% 100%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
  font-size: 0;
  &.round { border-radius: 50% }

  &.has-skin {
    -webkit-mask-image: var(--skin-mask);
    mask-image: var(--skin-mask);
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
