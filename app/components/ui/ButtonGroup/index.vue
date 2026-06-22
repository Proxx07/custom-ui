<script setup lang="ts" generic="T, V extends keyof T = never">
import type { ButtonGroupEmits, ButtonGroupProps, ButtonGroupSlots, ButtonValue } from './types';

const {
  modelValue,
  items = [],
  itemLabel,
  value,
  groupBg = 'outline',
  color = 'on-surface',
  hoverColor = 'on-surface',
  activeColor = 'on-tretiary',

  bg = 'transparent',
  hoverBg = 'surface-high-container',
  activeBg = 'surface-container',

} = defineProps<ButtonGroupProps<T, V>>();

const emit = defineEmits<ButtonGroupEmits<T, V>>();

defineSlots<ButtonGroupSlots<T>>();

const wrapperBg = computed(() => `var(--${groupBg})`);

const selectedItem = computed<T | undefined>(() => {
  if (modelValue == null) return undefined;
  const model = modelValue as T | T[V];
  return value ? items.find(item => item[value] === model) : (model as T);
});

const selectItem = (item: T) => {
  emit('update:modelValue', (value ? item[value] : item) as ButtonValue<T, V>);
};
</script>

<template>
  <div
    class="button-group"
    :style="{
      '--color': `var(--${color})`,
      '--hover-color': `var(--${hoverColor})`,
      '--active-color': `var(--${activeColor})`,

      '--bg': `var(--${bg})`,
      '--hover-bg': `var(--${hoverBg})`,
      '--active-bg': `var(--${activeBg})`,
    }"
  >
    <button
      v-for="(item, i) in items"
      :key="i"
      :class="[selectedItem === item && 'active']"
      @click="selectItem(item)"
    >
      <slot
        name="itemInner"
        :is-selected="selectedItem === item"
        :item="item"
      >
        {{ itemLabel ? String(item[itemLabel as keyof T]) : String(item) }}
      </slot>
    </button>
  </div>
</template>

<style scoped lang="scss">
.button-group {
  display: flex;
  align-items: center;
  background: v-bind(wrapperBg);
  padding: 2px;
  border-radius: var(--radius-m);
}

button {
  cursor: pointer;
  border: none;
  box-shadow: none;
  border-radius: var(--radius-sm);
  font: var(--font-16-n);
  padding: .9rem;
  transition: var(--fast-timing);
  background: var(--bg);
  color: var(--color);
  display: flex;

  &:hover {
    background: var(--hover-bg);
    color: var(--hover-color);
  }

  &.active {
    background: var(--active-bg);
    color: var(--active-color);
  }
}
</style>
