<script setup lang="ts">
import type { SwitcherEmits, SwitcherProps, SwitcherSlots } from './types';
import { loader } from '@/assets/icons/general';
import { VIcon } from '../index';

const { label = '', loading = false, modelValue = false, fluid = false, size = 'm' }
    = defineProps<SwitcherProps>();

const emit = defineEmits<SwitcherEmits>();

defineSlots<SwitcherSlots>();

const id = useId();
const labelRef = ref<HTMLLabelElement>();
const isHovered = useElementHover(labelRef);

const width = computed(() => fluid ? '100%' : 'auto');
const iconSize = computed(() => size === 's' ? 12 : 14);

const model = computed({
  get() {
    return modelValue;
  },

  set(val: boolean) {
    emit('update:modelValue', val);
  },
});
</script>

<template>
  <label ref="labelRef" :for="id" :class="[loading && 'loading', `size-${size}`]">
    <input :id="id" v-model="model" type="checkbox">
    <span class="track">
      <span class="knob">
        <VIcon
          v-if="loading"
          :icon="loader"
          :size="iconSize"
          color="var(--on-surface)"
        />
      </span>
    </span>
    <slot :is-hovered="isHovered" :label="label">
      <span v-if="label">
        {{ label }}
      </span>
    </slot>
  </label>
</template>

<style scoped lang="scss">
label {
  --bg: var(--outline);
  --knob-bg: var(--on-surface-tretiary);
  --track-w: 4rem;
  --track-h: 2rem;
  --knob: 2.4rem;
  --gap: 1.2rem;
  --font: var(--font-16-n);

  &:has(input:checked) {
    --bg: var(--secondary);
    --knob-bg: var(--on-secondary);
  }

  &:hover {
    --knob-bg: var(--on-surface);
  }

  &.size-s {
    --gap: .8rem;
    --track-w: 3.2rem;
    --track-h: 1.6rem;
    --knob: 2rem;
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

.track {
  box-sizing: border-box;
  width: var(--track-w);
  height: var(--track-h);
  flex-shrink: 0;
  background: var(--bg);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  transition: border-color var(--fast-timing), background var(--fast-timing);
}

.knob {
  width: var(--knob);
  height: var(--knob);
  border-radius: 50%;
  background: var(--knob-bg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-2px);
  transition: transform var(--fast-timing), background var(--fast-timing);
}

label:has(input:checked) .knob {
  --translate: calc(var(--track-w) - var(--knob) + 2px);
  transform: translateX(var(--translate));
}

input {
  display: none;
}
</style>
