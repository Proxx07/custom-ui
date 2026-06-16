<script setup lang="ts">
import type { PhaseLabelProps } from './types';

const {
  label = '',
  phase = 'phase',
  size = 'm',
} = defineProps<PhaseLabelProps>();

const font = computed(() => {
  if (size === 's') return 'font-12-n';
  if (size === 'l') return 'font-16-n';
  return 'font-14-n';
});

const bgVar = computed(() => `var(--${phase}-container)`);

const padding = computed(() => {
  const fontSize = font.value.split('-')[1];
  const fz = fontSize ? +fontSize : 14;
  return `${0.25 * fz ** 2 - 5.5 * fz + 36}px`;
});
</script>

<template>
  <div
    class="phase"
    :class="[font]"
  >
    <span :class="[`color-${phase}`]">
      {{ label }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.phase {
  position: relative;
  display: flex;
  align-items: center;
  span{
    padding: .4rem v-bind(padding) .4rem 0;
    border-radius: 1px var(--radius-sm) var(--radius-sm) 1px;
    background: v-bind(bgVar);
  }
  &:before {
    content: '';
    align-self: stretch;
    width: 1em;
    background: v-bind(bgVar);
    clip-path: polygon(0 52%, 101% 0, 101% 100%);
  }
}
</style>
