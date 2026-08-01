<script setup lang="ts">
import type { SkinImageProps } from './types';
import { hexagon } from '@/assets/icons/general';
import { VIcon } from '@/components/ui';
import { imageProxy, SKIN_IMAGE_ASPECT_RATIO } from '@/composables/useSkinItem';

defineOptions({ inheritAttrs: false });

const props = defineProps<SkinImageProps>();

const skinAspectRatio = 1 / SKIN_IMAGE_ASPECT_RATIO[props.game];

const sourceQueries = computed(() => {
  if (!props.imageQuery) return undefined;
  if (!props.cardSize) return props.imageQuery.default;
  return props.imageQuery[props.cardSize];
});

const activeImg = ref<string>(props.imageFront || props.image);

const sourceQueriesList = computed(() => !sourceQueries.value ? [] : Object.keys(sourceQueries.value).reverse());
const fallbackImage = imageProxy(activeImg.value, { width: props.imageWidth || 200, game: props.game });
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
        :srcset="imageProxy(activeImg, { width: sourceQueries![+queryKey], game: props.game })"
        :media="`(width >= ${queryKey}px)`"
      >
      <img :src="fallbackImage" v-bind="$attrs">
    </picture>
    <div
      v-if="imageFront && imageBack"
      class="images-slider"
      @mouseleave="activeImg = imageFront"
    >
      <span class="flex-grow" @mouseenter="activeImg = imageFront" />
      <span class="flex-grow" @mouseenter="activeImg = imageBack" />
      <span class="flex-grow" @mouseenter="activeImg = image" />
    </div>
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

.images-slider {
  position: absolute;
  inset: 0;
  display: flex;
  > span {
    border-bottom: 2px solid transparent;
    &:hover {
      border-color: var(--outline);
    }
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
    filter: blur(10px);
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
