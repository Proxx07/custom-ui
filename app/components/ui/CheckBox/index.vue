<script setup lang="ts" generic="T extends CheckboxValue = CheckboxValue">
import type { CheckboxEmits, CheckboxProps, CheckboxSlots, CheckboxValue } from './types';
import { tick } from '@/assets/icons/actions';
import { loader } from '@/assets/icons/general';
import { VIcon } from '../index';

const { label = '', loading = false, modelValue = false, value = undefined, fluid = false, size = 'm' } = defineProps<CheckboxProps<T>>();

const emit = defineEmits<CheckboxEmits<T>>();

defineSlots<CheckboxSlots>();

const id = useId();
const labelRef = ref<HTMLLabelElement>();
const isHovered = useElementHover(labelRef);

const width = computed(() => fluid ? '100%' : 'auto');

const model = computed({
  get() {
    return modelValue;
  },

  set(value: boolean | T[]) {
    emit('update:modelValue', value);
  },
});

const checked = computed(() => {
  if (Array.isArray(modelValue)) {
    return value !== undefined && modelValue.includes(value);
  }
  return modelValue;
});

const updateOnlyCurrent = () => {
  if (!Array.isArray(modelValue)) return;
  model.value = value === undefined ? [] : [value];
};
</script>

<template>
  <label ref="labelRef" :for="id" :class="[loading && 'loading', `size-${size}`]">
    <input :id="id" v-model="model" type="checkbox" :value="value">
    <span class="checkbox">
      <VIcon
        v-if="loading"
        :icon="loader"
        :color="checked ? 'var(--surface-container)' : 'var(--on-surface-secondary)'"
      />
      <VIcon
        v-else-if="checked"
        :icon="tick"
        color="var(--surface-container)"
      />
    </span>
    <slot :is-hovered="isHovered" :update-only-current="updateOnlyCurrent" :label="label">
      <span v-if="label">
        {{ label }}
      </span>
    </slot>
  </label>
</template>

<style scoped lang="scss">
label {
  --border: var(--on-surface-secondary);
  --bg: transparent;
  --checkbox-size: 2.4rem;
  --gap: 1.2rem;
  --font: var(--font-16-n);

  &:has(input:checked) {
    --bg: var(--on-surface);
    --border: transparent;
  }

  &:hover {
    --border: var(--on-surface);
  }

  &.size-s {
    --checkbox-size: 2rem;
    --gap: .8rem;
    --font: var(--font-14-n);
  }

  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  width: v-bind(width);
  gap: var(--gap);
  font: var(--font);
  &.loading {
    cursor: wait;
    pointer-events: none;
  }
}

.checkbox {
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border: 2px solid var(--border);
  background: var(--bg);
  border-radius: var(--radius-sm);
  transition: border-color var(--fast-timing), background var(--fast-timing);
}

input {
  display: none;
}
</style>
