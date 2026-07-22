<script setup lang="ts">
import type { SkinImageProps } from './types';
import { hexagon } from '@/assets/icons/general';
import { VIcon } from '@/components/ui';
import { imageProxy, SKIN_IMAGE_ASPECT_RATIO } from '@/composables/useSkinItem';

defineOptions({ inheritAttrs: false });

const props = defineProps<SkinImageProps>();

const sourceQueries = computed(() => {
  if (!props.imageQuery) return undefined;
  if (!props.cardSize) return props.imageQuery.default;
  return props.imageQuery[props.cardSize];
});

const sourceQueriesList = computed(() => !sourceQueries.value ? [] : Object.keys(sourceQueries.value).reverse());

const fallbackImage = imageProxy(props.image, { width: props.imageWidth || 200, game: props.game });

const skinAspectRatio = 1 / SKIN_IMAGE_ASPECT_RATIO[props.game];
</script>

<template>
  <div class="picture-wrapper">
    <div
      v-if="rarityImage && game !== 'dota2'"
      class="rarity w-full h-full"
      :style="{ color: rarityColor ?? 'currentColor' }"
    >
      <VIcon
        v-if="rarityImage === 'hex'"
        :icon="hexagon"
        class="rarity-inner"
      />
      <div v-if="rarityImage === 'shadow'" class="rarity-inner" />
    </div>
    <picture>
      <source
        v-for="queryKey in sourceQueriesList"
        :key="queryKey + cardSize"
        :srcset="imageProxy(props.image, { width: sourceQueries![+queryKey], game: props.game })"
        :media="`(width >= ${queryKey}px)`"
      >
      <img :src="fallbackImage" v-bind="$attrs">
    </picture>
  </div>
</template>

<style scoped lang="scss">
.picture-wrapper {
  display: block;
  aspect-ratio: v-bind(skinAspectRatio);
  width: 100%;
  font-size: 0;
  position: relative;
  picture {
    width: 100%;
    display: block;
    height: 100%;
    position: relative;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.rarity {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .rarity-inner {
    aspect-ratio: 1;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: currentColor;
    filter: blur(30px);
    opacity: 0.5;
    height: 75%;
    &:has(svg) {
      opacity: 1;
      border-radius: 0;
      background: none;
      height: 90%;
      filter: drop-shadow(0 0 6px currentColor);
    }
  }
}
</style>
