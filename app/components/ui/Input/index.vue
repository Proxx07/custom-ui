<script setup lang="ts" generic="T extends InputModelValue = string">
import type { InputEmits, InputModelValue, InputProps, InputSlots } from './types';
import { cross } from '@/assets/icons/actions';
import { attention, loader } from '@/assets/icons/general';
import { Button, VIcon } from '../index';

defineOptions({
  inheritAttrs: false,
});
const {
  size = 'm',
  invalid = false,
  maxWidth = '100%',
  label = '',
  hint = '',
  modelValue,
  loading = false,
  type = 'text',
} = defineProps<InputProps<T>>();

const emit = defineEmits<InputEmits<T>>();

defineSlots<InputSlots>();

const id = useId();
const $attrs = useAttrs();

const model = computed({
  get() {
    return modelValue;
  },
  set(value: T) {
    emit('update:modelValue', value);
  },
});

const inputTemplateRef = ref<HTMLInputElement>();
const inputWrapperRef = ref<HTMLElement>();

const { left: inputLeftPos, top: inputTopPos, update: updateInputBounds } = useElementBounding(inputTemplateRef);
const { left: wrapperLeftPos, top: wrapperTopPos } = useElementBounding(inputWrapperRef);

useResizeObserver(inputWrapperRef, updateInputBounds);

const padding = computed(() => {
  if (size === 's') return '1.2rem 0';
  if (size === 'l') return '1.5rem 0 1.4rem';
  if (size === 'xl') return '1.8rem 0 1.7rem';
  return '1.3rem 0 1.2rem';
});

const { focused } = useFocus(inputTemplateRef);
const hasValue = computed(() => model.value !== '' && model.value != null);
const isLabelFloated = computed(() => {
  return focused.value || hasValue.value;
});

const labelPosition = computed(() => {
  const pt = (+padding.value.slice(0, 3) * 10) as number;
  if (isLabelFloated.value) return `translate(-10%, -100%) scale(0.8)`;
  return `translate(${inputLeftPos.value - wrapperLeftPos.value}px, ${inputTopPos.value - wrapperTopPos.value + pt}px) scale(1)`;
});

const placeHolderText = computed<string>(() => {
  if (!focused.value && label) return label;
  return $attrs.placeholder as string || '';
});

const clearInput = () => {
  model.value = '' as T;
};

watch(focused, (val) => {
  if (!val) return emit('blur');
  emit('focus');
});
</script>

<template>
  <div
    ref="inputWrapperRef"
    class="input-wrapper"
    :class="[
      invalid && 'invalid',
      loading && 'loading',
      `size-${size}`,
    ]"
  >
    <client-only v-if="label">
      <label :for="id">
        {{ label }}
      </label>
    </client-only>
    <div class="input-inner">
      <slot name="prefix" />
      <input
        v-bind="$attrs"
        :id="id"
        ref="inputTemplateRef"
        v-model="model"
        :placeholder="placeHolderText"
        :type="type"
        class="w-input"
        :readonly="loading"
      >
      <slot name="suffix" :loading="loading">
        <VIcon
          v-if="loading"
          :icon="loader"
        />
        <VIcon
          v-else-if="invalid"
          :icon="attention"
        />
        <Button
          v-else-if="hasValue"
          variant="text"
          :size="size"
          :icon-left="cross"
          severity="tretiary"
          @click="clearInput"
        />
      </slot>
    </div>
    <transition name="slide-down">
      <div
        v-if="hint && typeof hint === 'string'"
        class="hint"
      >
        {{ hint }}
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  --border: var(--outline);
  --bg: var(--surface-low-container);
  --color: var(--on-surface);
  --radius: var(--radius-sm);
  --font: var(--font-16-n);
  --gap: 0.6rem;

  --placeholder-color: var(--on-surface-secondary);
  position: relative;
  color: var(--color);
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

  &:has(label) {
    input {
      &::placeholder {
        opacity: 0;
      }
      &:focus {
        &::placeholder {
          opacity: 1;
          transition: opacity var(--fast-timing);
        }
      }
    }
  }

  label {
    font: var(--font);
    position: absolute;
    left: 0;
    top: 0;
    transition: transform var(--fast-timing), color var(--fast-timing);
    transform: v-bind(labelPosition);
    color: var(--placeholder-color);
    pointer-events: none;
  }

  .hint {
    font: var(--font-13-n);
    color: var(--placeholder-color);
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 2px;
  }

  &:has(input:focus), &.invalid {
    label, .hint { color: currentColor }
  }

  &.loading {
    cursor: wait;
    input {
      pointer-events: none;
    }
  }
}

.input-inner {
  &:has(.w-input:first-child) {
    padding-left: 1.6rem;
  }
  &:has(.w-input:last-child) {
    padding-right: 1.6rem;
  }
  > span:has(svg) {
    padding-right: 1.6rem;
  }

  outline: 1px solid var(--border);
  background: var(--bg);
  border-radius: var(--radius);
  transition: background var(--fast-timing), color var(--fast-timing);
  gap: var(--gap);
  max-width: v-bind(maxWidth);

  display: flex;
  align-items: center;

  :deep(.w-button) {
    min-width: max-content;
  }
}
input {
  outline: none;
  background: transparent;
  color: inherit;
  border: none;
  font: var(--font);
  padding: v-bind(padding);
  margin-right: calc(var(--gap) * -1);
  width: auto;
  min-width: 0;
  flex-grow: 1;
  -moz-appearance: textfield;
  &:last-child {
    margin-right: 0;
  }
  &::placeholder {
    color: var(--placeholder-color);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
     transition: background-color 0s 600000s, color 0s 600000s;
  }
}
</style>
