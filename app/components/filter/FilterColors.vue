<script setup lang="ts">
import type { FilterColorType } from '@/utils';
import { Tooltip } from '@/components/ui';
import { FILTER_COLORS } from '@/utils/colors';

const props = defineProps<{
  modelValue?: FilterColorType
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: FilterColorType | undefined): void
}>();

const { t } = useI18n();

const updateHandler = (value: FilterColorType) => {
  if (props.modelValue === value) {
    emit('update:modelValue', undefined);
  }
  else {
    emit('update:modelValue', value);
  }
};
</script>

<template>
  <div class="colors-wrapper">
    <Tooltip
      v-for="color in FILTER_COLORS"
      :key="color.value"
      position="top"
      :text="t(`colors.${color.value}`)"
    >
      <button
        :class="[props.modelValue === color.value && 'active']"
        :style="{ color: color.color }"
        @click="updateHandler(color.value)"
      />
    </Tooltip>
  </div>
</template>

<style scoped lang="scss">
.colors-wrapper {
  display: flex;
  gap: 1.8rem;
  flex-wrap: wrap;
  button {
    width: 2.6rem;
    height: 2.6rem;
    background: linear-gradient(to bottom right, color-mix(in srgb, currentColor 65%, #000) 50%, currentColor 50%);
    position: relative;
    transition: var(--transition-fast);
    border-radius: 50%;
    outline-offset: -5px;
    &:after {
      content: '';
      position: absolute;
      background: currentColor;
      inset: 0;
      opacity: 0;
      transition: opacity var(--fast-timing);
      border-radius: 50%;
    }

    &:hover {
      transform: scale(1.1);
      &:after {
        opacity: 1;
      }
    }

    &.active {
      outline: 2px solid var(--surface-container);
      &:after {
        opacity: 0;
      }
    }
  }
}
</style>
