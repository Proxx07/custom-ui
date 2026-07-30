<script setup lang="ts">
import type { CardSizeType } from '@/composables/UI';
import { Skeleton } from '@/components/ui';

const { ratio = 1, skinNumber = 0, cardSize } = defineProps<{
  ratio: number
  skinNumber: number
  cardSize: CardSizeType
}>();

const typeHeight = cardSize === 'large' ? '16px' : '14px';
const nameHeight = cardSize === 'large' ? '19px' : cardSize === 'small' ? '16px' : '14px';
</script>

<template>
  <div class="skin-skeleton">
    <div class="flex items-center gap">
      <Skeleton width="30px" height="20px" />
      <Skeleton width="70px" height="20px" class="ml-auto" />
    </div>
    <div class="picture-wrapper">
      <Skeleton width="100%" height="100%" :skin="skinNumber" />
    </div>

    <Skeleton width="50%" :height="typeHeight" />
    <Skeleton width="70%" :height="nameHeight" />
    <Skeleton width="100%" height="25px" style="margin-top: 6px" />

    <div class="buttons">
      <Skeleton :width="cardSize === 'large' ? '44px' : '40px'" :height="cardSize === 'large' ? '44px' : '40px'" />
      <Skeleton width="100%" :height="cardSize === 'large' ? '44px' : '40px'" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.skin-skeleton {
  border-radius: var(--radius-m);
  width: 100%;
}
.picture-wrapper {
  width: 100%;
  aspect-ratio: v-bind(ratio);
}

.buttons {
  padding-top: 1.2rem;
  gap: 4px;
  display: grid;
  grid-template-columns: auto 1fr;
}
</style>
