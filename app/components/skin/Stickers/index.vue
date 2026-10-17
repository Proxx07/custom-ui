<script setup lang="ts">
import { NuxtLinkLocale } from '#components';
import { directToOtherPage } from '@/assets/icons/arrows';
import { Button, Tooltip, VIcon } from '@/components/ui';
import { imageProxy, type ISkinCardSticker } from '@/composables/useSkinItem';

const props = defineProps<{
  stickers: ISkinCardSticker[]
  link?: string
}>();

const emit = defineEmits<{
  (e: 'sticker-selected', name: string): void
}>();

const buttonClick = (name: string) => {
  if (props.link) return;
  emit('sticker-selected', name);
};

const width = `${Math.min(100 / props.stickers.length, 25)}%`;
</script>

<template>
  <div class="list">
    <Tooltip
      v-for="sticker in stickers"
      :key="sticker.id"
      class="item"
    >
      <component
        :is="props.link ? NuxtLinkLocale : 'button'"
        :to="props.link ? { path: link, query: { stickers: [sticker.name] } } : undefined"
        class="fz-0"
        @click.stop="buttonClick(sticker.name)"
      >
        <img
          :src="imageProxy(sticker.image, { width: 50 })"
          :srcset="`${imageProxy(sticker.image, { width: 50 })} 1x, ${imageProxy(sticker.image, { width: 100 })} 2x`"
          :alt="sticker.name"
          loading="lazy"
          :class="[sticker.sluggedName.includes('charm') && 'charm-sticker']"
        >
      </component>
      <template #content>
        <div class="flex-col" style="max-width: 15rem">
          <div class="font-14-n">
            {{ sticker.name }}
          </div>

          <div class="font-14-b flex w-full items-center">
            <slot name="price" :value="sticker.price" />

            <Button
              :to="`/${sticker.sluggedName}/item`"
              class="ml-auto"
              button-type="nuxt-link"
              severity="tertiary"
              variant="text"
              size="s"
              padding=".4rem"
              no-hover-bg
            >
              <VIcon :icon="directToOtherPage" :size="20" />
            </Button>
          </div>
        </div>
      </template>
    </Tooltip>
  </div>
</template>

<style scoped lang="scss">
.list {
  display: flex;
  align-items: center;
  justify-content: center;
}

.item {
  max-width: v-bind(width);
}
.charm-sticker {
  margin: 0 -0.5rem;
  max-width: calc(100% + 1rem);
}
</style>
