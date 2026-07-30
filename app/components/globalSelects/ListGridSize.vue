<script setup lang="ts">
import type { CardSizeType } from '@/composables/UI';
import { grid2x, grid3x, grid3x3 } from '@/assets/icons/actions';
import { ButtonGroup, VIcon } from '@/components/ui';

const props = defineProps<{
  modelValue: CardSizeType
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: CardSizeType): void
}>();

const cardSize = computed({
  get() {
    return props.modelValue;
  },
  set(value: CardSizeType) {
    emit('update:modelValue', value);
  },
});

const CARD_SIZE_LIST = [
  { label: grid2x, value: 'large' },
  { label: grid3x, value: 'default' },
  { label: grid3x3, value: 'small' },
];
</script>

<template>
  <ButtonGroup
    v-model="cardSize"
    :items="CARD_SIZE_LIST"
    value="value"
    class="card-size-group"
  >
    <template #itemInner="{ item }">
      <VIcon :icon="item.label" :size="20" class="icon" />
    </template>
  </ButtonGroup>
</template>

<style scoped lang="scss">
.card-size-group {
  flex-shrink: 0;
  :deep(button:not(.active)) {
    &:hover {
      .icon {
        transform: scale(1.2);
      }
    }
  }
}
.icon {
  margin: -1px;
  @include transition(transform);
}
</style>
