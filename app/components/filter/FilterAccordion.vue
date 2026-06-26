<script setup lang="ts">
import { chevronDown } from '@/assets/icons/arrows';
import { Button } from '@/components/ui/';

const { title = '', opened = false } = defineProps<{
  title?: string
  opened?: boolean
}>();

const emit = defineEmits<{
  (e: 'after-open'): void
  (e: 'after-close'): void
}>();

defineSlots<{
  default: () => unknown
  headerBottomSlot: () => unknown
}>();

const isOpened = ref(opened);

const handleOpen = () => {
  isOpened.value = !isOpened.value;
  if (isOpened.value) return emit('after-open');
  return emit('after-close');
};
</script>

<template>
  <div class="filter" :class="{ opened: isOpened }">
    <div class="button-wrapper">
      <Button
        :label="title"
        :icon-right="chevronDown"
        :rotate-right-icon="isOpened"
        severity="tretiary"
        variant="text"
        padding="14px 0 15px"
        size="l"
        class="accordion-button"
        no-hover-bg
        fluid
        @click="handleOpen"
      />
      <transition name="slide-down">
        <slot
          v-if="!isOpened"
          name="headerBottomSlot"
        />
      </transition>
    </div>

    <div class="body" :class="[!isOpened && 'overflow-hidden']">
      <div
        class="body-content"
        :class="{ 'slide-in': isOpened }"
      >
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter {
  display: grid;
  transition: grid-template-rows var(--fast-timing);
  transition-delay: .2s;
  grid-template-rows: auto 0fr;

  &.opened {
    grid-template-rows: 50px 1fr;
    transition-delay: 0s;
  }

  .body {
    min-height: 0;
  }

  .body-content {
    transition: transform var(--slow-timing), opacity var(--slow-timing);
    transform: translateX(-100%);
    height: auto;
    opacity: 0;
    padding-top: .9rem;
    &.slide-in {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .button-wrapper {
    display: flex;
    flex-direction: column;
    gap: .6rem;
  }

  .accordion-button {
    font: var(--font-18-m);
    :deep(.icon) {
      color: var(--on-surface-tretiary) !important;
    }
    &:hover {
      :deep(.icon) {
        color: var(--on-surface) !important;
      }
    }
  }
}
</style>
