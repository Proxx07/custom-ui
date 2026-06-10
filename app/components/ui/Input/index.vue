<script lang="ts" setup>
import type { InputSlots } from './types';
import type { TSizes } from '@/utils';
import { cross } from '@/assets/icons/actions';
import { Button } from '../index';

defineOptions({
  inheritAttrs: false,
});
const { size = 'm', invalid = false } = defineProps<{
  size?: TSizes
  invalid?: boolean
}>();

const $slots = defineSlots<InputSlots>();

const model = defineModel();

console.log($slots);
const $attrs = useAttrs();

const padding = computed(() => {
  if (size === 's') return '1.2rem 0';
  if (size === 'l') return '1.5rem 0 1.4rem';
  if (size === 'xl') return '1.8rem 0 1.7rem';
  return '1.3rem 0 1.2rem';
});

const showClearIcon = computed(() => {
  return model.value;
});
</script>

<template>
  <div class="input-wrapper" :class="[`size-${size}`, invalid && 'invalid']">
    <slot name="prefix" />
    <input
      v-model="model"
      type="text"
      v-bind="$attrs"
    >
    <slot name="suffix">
      <Button
        v-if="showClearIcon"
        variant="text"
        :size="size"
        :icon-left="cross"
        severity="tretiary"
        @click="model = ''"
      />
    </slot>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  --border: var(--outline);
  --bg: var(--surface-low-container);
  --color: var(--on-surface);
  --radius: var(--radius-sm);
  --font: var(--font-16-n);

  &.size-s {
    --font: var(--font-14-n);
  }

  &.size-l {
    --font: var(--font-18-n);
  }

  &.size-xl {
    --font: var(--font-18-n);
  }

  &:hover, &:focus-within {
    --border: var(--outline-variant);
  }

  &.invalid {
    --color: var(--on-error);
    --border: currentColor;
  }

  outline: 1px solid var(--border);
  background: var(--bg);
  color: var(--color);
  border-radius: var(--radius);
  transition: var(--transition-fast);

  display: flex;
  align-items: center;
}
input {
  outline: none;
  background: transparent;
  color: inherit;
  border: none;
  font: var(--font);
  padding: v-bind(padding);
  &::placeholder {
    color: var(--on-surface-secondary);
  }
}
</style>
