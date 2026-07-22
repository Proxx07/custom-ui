<script setup lang="ts">
import type { CardSizeType } from '@/composables/UI';

const props = defineProps<{
  size: CardSizeType
  loading?: boolean
}>();

defineSlots<{
  default: () => unknown
  skeletons: () => unknown
}>();
</script>

<template>
  <div class="list-wrapper" :class="[`size-${props.size}`]">
    <div class="list">
      <slot />
      <template v-if="loading">
        <slot name="skeletons" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-wrapper {
  width: 100%;
  --item-width: 18rem;
  &.size-small {
    --item-width: 15.5rem
  }
  &.size-large {
    --item-width: 21rem
  }
}
.list {
  display: grid;
  gap: .8rem;
  grid-template-columns: repeat(auto-fill, minmax(var(--item-width), 1fr));
  width: 100%;
  @include media-max($mobile) {
    --item-width: 14rem;
    &.size-small,
    &.size-large {
      --item-width: 14rem;
    }
  }
}
</style>
