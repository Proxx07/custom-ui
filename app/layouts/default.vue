<script setup lang="ts">
import { WAside, WFooter, WHeader } from '@/components/layout';

const footerHeight = ref(0);
const footerHeightPx = computed(() => `${footerHeight.value}px`);
</script>

<template>
  <div class="wrapper">
    <WHeader />
    <WAside />
    <main class="content">
      <slot />
    </main>
    <WFooter
      v-model:height="footerHeight"
    />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  --container-padding-y: 1.2rem;
  --container-padding-x: 1.6rem;

  --gap: 5px;
  --header-height: 69px;
  --footer-height: v-bind(footerHeightPx);
  --aside-height: calc(100dvh - var(--footer-height) - var(--header-height) - var(--gap));
  display: grid;
  grid-template-columns: 330px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: var(--gap);
  flex-grow: 1;
  position: relative;
  @include media-max($tablet) {
    grid-template-columns: 1fr;
  }

}

.content {
  display: flex;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: var(--container-padding-y) var(--container-padding-x);
  padding-bottom: 6rem;
  & > * {
    flex-grow: 1;
  }
}
</style>
