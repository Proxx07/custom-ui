<script setup lang="ts">
import type { SkinSlots } from './types';
import { type SkinItemProps, useSkinItem } from '@/composables/useSkinItem';

const props = defineProps<SkinItemProps>();

defineSlots<SkinSlots>();

const {
  isStatTrack,
  isSouvenir,
  skinType,
  skinName,
  phase,
  price,
  steamPrice,
  image,
  offersCount,
  float,
  floatPercent,
} = useSkinItem(props);

const bg = computed(() => props.background ? `var(--${props.background})` : 'transparent');
const hoverBg = computed(() => props.hoverBackground ? `var(--${props.hoverBackground})` : 'transparent');
</script>

<template>
  <div class="skin">
    <slot
      :skin-name="skinName"
      :image="image"
      :price="price"
      :skin-type="skinType"
      :steam-price="steamPrice"
      :phase="phase"
      :souvenir="isSouvenir"
      :stat-track="isStatTrack"
      :exterior="item.exterior"
      :rarity-color="item.rarityColor"
      :float="float"
      :offers-count="offersCount"
      :float-percent="floatPercent"
      name="default"
    />
  </div>
</template>

<style scoped lang="scss">
.skin {
  max-width: 100%;
  background: v-bind(bg);
  border-radius: var(--radius-m);
  @include transition(background);
  &:hover {
    background: v-bind(hoverBg);
  }
}
</style>
