<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { InputRangeEmits, InputRangeProps } from './types';

const {
  min = 0,
  max = 100,
  step = 1,
  fillBg = 'primary',
  disabled = false,
  showValue = false,
  modelValue = 0,
  range = false,
  from,
  to,
  fluidFill = false,
  hideValue = false,
} = defineProps<InputRangeProps>();

const emit = defineEmits<InputRangeEmits>();

const inputRangeWrapper = ref<HTMLDivElement>();

const { pressed } = useMousePressed({ target: inputRangeWrapper, touch: true });
const { elementX, elementWidth: totalWidth } = useMouseInElement(inputRangeWrapper);

const span = computed(() => max - min);
const decimals = computed(() => (String(step).split('.')[1] || '').length);

const clampValue = (value: number) => {
  if (span.value <= 0) return min;
  const snapped = Math.round((value - min) / step) * step + min;
  return +Math.min(max, Math.max(min, snapped)).toFixed(decimals.value);
};

const xPosition = computed(() => {
  if (totalWidth.value <= 0) return 0;
  return Math.min(Math.max(elementX.value, 0), totalWidth.value);
});

const valueFromPosition = (px: number) => {
  if (span.value <= 0 || totalWidth.value <= 0) return min;
  return clampValue(min + (px / totalWidth.value) * span.value);
};

const percentOf = (value: number) => {
  if (span.value <= 0) return 0;
  return +((value - min) / span.value * 100).toFixed(2);
};

const displayValue = computed(() => clampValue(modelValue));

const fromValue = computed(() => clampValue(from ?? min));
const toValue = computed(() => clampValue(to ?? max));

const activeThumb = ref<'from' | 'to'>('from');

const pickActiveThumb = () => {
  const pointer = valueFromPosition(xPosition.value);
  const start = fromValue.value;
  const end = toValue.value;
  if (pointer <= start) {
    activeThumb.value = 'from';
    return;
  }
  if (pointer >= end) {
    activeThumb.value = 'to';
    return;
  }
  const distanceFrom = pointer - start;
  const distanceTo = end - pointer;
  if (distanceFrom < distanceTo) activeThumb.value = 'from';
  else if (distanceTo < distanceFrom) activeThumb.value = 'to';
  else activeThumb.value = pointer < end ? 'from' : 'to';
};

const rootStyle = computed<CSSProperties>(() => ({
  '--from': `${range ? percentOf(fromValue.value) : 0}%`,
  '--to': `${percentOf(range ? toValue.value : displayValue.value)}%`,
  '--fill-bg': `var(--${fillBg})`,
  '--knob-color': `var(--${fillBg})`,
}));

const isBgGradient = computed(() => {
  return fillBg === 'float-bg' || fillBg === 'fade-bg';
});

watch(pressed, (isPressed) => {
  if (range && isPressed && !disabled) pickActiveThumb();
});

watch([elementX, pressed], () => {
  if (!pressed.value || disabled) return;
  const next = valueFromPosition(xPosition.value);

  if (!range) {
    if (next !== displayValue.value) emit('update:modelValue', next);
    return;
  }

  if (activeThumb.value === 'from') {
    const clamped = Math.min(next, toValue.value);
    if (clamped !== fromValue.value) emit('update:from', clamped);
  }
  else {
    const clamped = Math.max(next, fromValue.value);
    if (clamped !== toValue.value) emit('update:to', clamped);
  }
});
</script>

<template>
  <div
    ref="inputRangeWrapper"
    class="input-range"
    :class="[disabled && 'disabled', isBgGradient && 'exact-bg-variable']"
    :style="rootStyle"
  >
    <div class="track">
      <div class="fill" :class="[fluidFill && 'fluid']" />
    </div>

    <div v-if="range" class="knob knob-from">
      <div
        v-if="!hideValue"
        class="knob-value"
        :class="[(pressed && activeThumb === 'from' || showValue) && 'show']"
      >
        {{ fromValue }}
      </div>
    </div>

    <div class="knob knob-to">
      <div
        v-if="!hideValue"
        class="knob-value"
        :class="[(pressed && (!range || activeThumb === 'to' || showValue)) && 'show']"
      >
        {{ range ? toValue : displayValue }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin line-gradient($color) {
  background: linear-gradient(90deg, transparent 0%, $color 15%, $color 50%, $color 85%, transparent 100%);
}
.input-range {
  --size: 1.6rem;
  --track-h: 2px;
  --track-color: var(--outline-variant);
  --knob-border: 2px;
  position: relative;
  min-height: var(--size);
  cursor: pointer;
  &.disabled {
    opacity: .5;
    pointer-events: none;
  }
}

.track {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: var(--track-h);
  @include line-gradient(var(--track-color));
  transform: translateY(-50%);
}

.fill {
  position: absolute;
  inset-block: 0;
  left: var(--from);
  width: calc(var(--to) - var(--from));
  @include line-gradient(var(--fill-bg));
  &.fluid {
    left: 0;
    width: 100%;
  }
}

.input-range.exact-bg-variable {
  .knob {
    --knob-color: var(--on-surface);
    border-color: var(--knob-color);
    &::after {
      inset: var(--knob-border);
    }
  }
  .fill {
    background: var(--fill-bg);
  }
}

.knob {
  position: absolute;
  top: 50%;
  margin-top: calc(var(--size) / -2);
  width: var(--size);
  height: var(--size);
  border: var(--knob-border) solid color-mix(in srgb, var(--knob-color) 40%, transparent);
  border-radius: 50%;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--knob-color);
    // inset: var(--knob-border);
  }

  &-value {
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translate(-50%, -50%);
    min-width: 3.2rem;
    padding: .4rem;
    border-radius: var(--radius-sm);
    background: var(--surface-container);
    color: var(--on-surface);
    text-align: center;
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--fast-timing);

    &.show {
      opacity: 1;
    }
  }
}

.knob-from { left: var(--from); }
.knob-to { left: var(--to); }
</style>
