<script lang="ts" setup>
import type { TColors } from '@/utils';

const {
  modelValue = false,
  modalBg = 'surface-container',
} = defineProps<{
  modelValue: boolean
  modalBg?: TColors
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const closeModal = () => {
  emit('update:modelValue', false);
};
</script>

<template>
  <Teleport to="#teleports">
    <transition name="fade">
      <div
        v-if="modelValue"
        class="modal-backdrop"
        @click="closeModal"
      />
    </transition>

    <transition name="modal">
      <div v-if="modelValue" class="modal-wrapper">
        <div
          class="modal-dialog"
          :class="[`bg-${modalBg}`]"
          @click.stop
        >
          {DIALOG}
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--fast-timing), transform var(--fast-timing);
}

.modal-enter-from {
  opacity: 0;
  transform: scale(.9);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.modal-backdrop,
.modal-wrapper {
  position: fixed;
  z-index: 100;
  inset: 0;
}

.modal-backdrop {
  background: hsla(var(--h), var(--s), var(--l-9), 0.6);
}

.modal-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  pointer-events: none;
}

.modal-dialog {
  pointer-events: all;
}
</style>
