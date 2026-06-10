<script setup lang="ts">
import { tick } from '@/assets/icons/actions';
import { loader } from '@/assets/icons/general';
import { VIcon } from '..';

const { label = '', loading = false, modelValue = false } = defineProps<{
  modelValue?: boolean
  label?: string
  loading?: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const id = useId();
const model = computed({
  get() {
    return modelValue;
  },

  set(value: boolean) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <label :for="id" :class="[loading && 'loading']">
    <input :id="id" v-model="model" type="checkbox">
    <span class="checkbox">
      <VIcon
        v-if="loading"
        :icon="loader"
        :color="model ? 'var(--surface-container)' : 'var(--on-surface-secondary)'"
      />
      <VIcon
        v-else-if="model"
        :icon="tick"
        color="var(--surface-container)"
      />
    </span>
    <slot>
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
  &:has(input:checked) {
    --bg: var(--on-surface);
    --border: transparent;
  }
  font: var(--font-16-n);
  display: inline-flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;

  &.loading {
    cursor: wait;
    pointer-events: none;
  }
}

.checkbox {
  width: 2.4rem;
  height: 2.4rem;
  border: 2px solid var(--border);
  background: var(--bg);
  border-radius: var(--radius-sm);
  transition: border-color var(--fast-timing), background var(--fast-timing);
}

input {
  display: none;
}
</style>
