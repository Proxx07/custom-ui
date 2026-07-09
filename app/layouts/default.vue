<script setup lang="ts">
import { WAside, WFooter, WHeader } from '@/components/layout';

const props = defineProps<{
  showSidebar?: boolean
}>();

const footer = ref<InstanceType<typeof WFooter>>();
</script>

<template>
  <div
    class="wrapper" :style="{
      '--footer-height': `${footer?.isFooterVisible ? (footer?.height ?? 0) : 0}px`,
      '--header-height': '62px',
    }"
  >
    <WHeader />

    <transition name="aside-animation">
      <WAside
        v-if="props.showSidebar"
      />
    </transition>

    <main
      class="content"
      :class="[!props.showSidebar && 'colspan-2']"
    >
      <slot />
    </main>

    <WFooter ref="footer" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  --container-padding-y: .9rem;
  --container-padding-x: 1.6rem;
  --gap: 5px;

  --aside-height: calc(100dvh - var(--footer-height) - var(--header-height) - var(--gap) - 3px);

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

.aside-animation-enter-active {
  @include transition(transform);
}

.aside-animation-enter-from,
.aside-animation-leave-to {
  transform: translateX(-100%);
}
</style>
