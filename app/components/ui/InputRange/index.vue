<script setup lang="ts">
import type { InputRangeProps } from './types';

const {
  // min = 0,
  max = 100,
  // step = 1,
  color = 'primary',
  disabled = false,
  // showValue = false,
  modelValue = 0,
} = defineProps<InputRangeProps>();

const inputRangeWrapper = ref<HTMLDivElement>();

const {
  x: boundX,
  right: boundRight,
  left: boundLeft,
  update: updateBounds,
} = useElementBounding(inputRangeWrapper);

const knob = ref<HTMLDivElement>();
const { pressed } = useMousePressed({ target: knob });

const isInteracted = ref<boolean>(false);

const { x } = useMouse();
const totalWidth = computed(() => boundRight.value - boundLeft.value);

const xPosition = computed(() => {
  const widthPosition = boundX.value + totalWidth.value;
  if (x.value < boundX.value) return 0;
  if (x.value > widthPosition) return totalWidth.value;
  return Math.abs(boundX.value - x.value);
});

const percents = computed(() => {
  if (!isInteracted.value) return +(modelValue / max * 100).toFixed(2);
  return +(xPosition.value / totalWidth.value * 100).toFixed(2);
});

const relativeXPosition = computed(() => {
  if (isInteracted.value) return xPosition.value;
  return +(totalWidth.value * percents.value / 100).toFixed(2);
});

watch(isInteracted, (value) => {
  if (value) updateBounds();
});
</script>

<template>
  <div
    ref="inputRangeWrapper"
    class="input-range"
    :class="[`color-${color}`, disabled && 'disabled']"
    :style="{
      '--fill-x': `${relativeXPosition - totalWidth}px`,
      '--knob-x': `${relativeXPosition}px`,
    }"
    @mousedown="isInteracted = true"
  >
    <div class="track">
      <div class="fill" />
      <div ref="knob" class="knob" />
      <div class="knob-value">
        {{ pressed }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.track {
  background: var(--outline-variant);
  height: 2px;
  width: 100%;
  position: relative;
}

.fill {
  position: absolute;
  inset: 0;
  background: currentColor;
  transform: translateX(var(--fill-x));
}

.knob {
  --size: 1.6rem;
  cursor: pointer;
  position: absolute;
  transform: translate(var(--knob-x), -50%);
  width: var(--size);
  height: var(--size);
  border: 2px solid var(--on-surface);
  border-radius: 50%;
  &:after {
    content: '';
    position: absolute;
    inset: 2px;
    background: var(--on-surface);
    border-radius: 50%;
  }
  &-value {
    position: absolute;
    transform: translate(var(--knob-x), -50%);
    padding: .4rem;
    border-radius: var(--radius-sm);
    background: var(--surface-highest-container);
    color: var(--on-surface);
    bottom: 100%;
    margin-left: -0.8rem;
  }
}
</style>
