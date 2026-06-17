<script lang="ts" setup>
import type { TColors } from '@/utils';

const {
  modelValue = false,
  modalBg = 'surface-container',
  maxWidth = 640,
  noHeaderBorder = false,
  title = '',
} = defineProps<{
  modelValue: boolean
  modalBg?: TColors
  maxWidth?: number
  noHeaderBorder?: boolean
  title?: string
  backButton?: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'back'): void
}>();

const closeModal = () => {
  emit('update:modelValue', false);
};

const emitBack = () => {
  emit('back');
};

const headerRef = ref<HTMLDivElement>();
const contentRef = ref<HTMLDivElement>();
const contentInnerRef = ref<HTMLDivElement>();
const footerRef = ref<HTMLDivElement>();

const { bottom: contentBottom } = useElementBounding(contentRef);
const { bottom: contentInnerBottom } = useElementBounding(contentInnerRef);

const { height: windowHeight } = useWindowSize();

const isLocked = useScrollLock(contentRef);
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
      <div
        v-if="modelValue"
        class="modal-wrapper"
        :style="{
          '--width': `${maxWidth}px`,
        }"
      >
        <div class="modal-dialog-outer">
          <div
            class="modal-dialog"
            :class="[`bg-${modalBg}`]"
            @click.stop
          >
            <div
              ref="headerRef"
              class="modal-dialog__header-outer"
            >
              <slot name="header">
                <div class="modal-dialog__header">
                  <slot name="header-inner">
                    <div
                      class="modal-dialog__header-inner"
                      :class="[!noHeaderBorder && 'with-border']"
                    >
                      <slot name="header-prepend" :emit-back="emitBack">
                        <div v-if="backButton" @click="emitBack">
                          {BACK_BUTTON}
                        </div>
                      </slot>

                      <div class="font-18-m">
                        {{ title }}
                        <pre class="font-12-n">
                          wh - {{ windowHeight }}
                          {{ contentBottom }}  |  {{ contentInnerBottom }}
                          isLocked - {{ isLocked }}
                        </pre>
                      </div>

                      <div class="header-append">
                        <slot name="header-append" />
                      </div>
                    </div>
                  </slot>
                </div>
              </slot>
            </div>

            <div ref="contentRef" class="modal-dialog__content">
              <div ref="contentInnerRef" class="modal-dialog__content-inner">
                <slot name="content">
                  {DIALOG_CONTENT}
                </slot>
              </div>
            </div>

            <div ref="footerRef" class="modal-dialog__footer-outer">
              <slot name="footer">
                <div class="modal-dialog__footer">
                  <slot name="footer-inner">
                    <div class="modal-dialog__footer-inner">
                      {DIALOG_FOOTER}
                    </div>
                  </slot>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--fast-timing), transform var(--fast-timing);
  @include media-max($mobile) {
    transition: opacity var(--slow-timing), transform var(--slow-timing);
  }
}

.modal-enter-from {
  opacity: 0;
  @include media-min($mobile) {
    transform: scale(.9);
  }
  @include media-max($mobile) {
    transform: translateY(100%);
  }
}

.modal-leave-to {
  opacity: 0;
  @include media-min($mobile) {
    transform: scale(1.1);
  }
  @include media-max($mobile) {
    transform: translateY(100%);
  }
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
  --padding-y: 2rem;
  --padding-x: 2.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  pointer-events: none;
  @include media-max($mobile) {
    align-items: flex-end;
  }
}

.modal-dialog-outer {
  --min-height: 40rem;
  --max-height: var(--min-height);

  pointer-events: all;
  max-width: var(--width);
  width: 100%;
  @include media-max($mobile) {
    --min-height: 60dvh;
    max-width: 100%;
  }
}
.modal-dialog {
  width: 100%;
  border-radius: var(--radius-m);
  display: flex;
  flex-direction: column;

  min-height: var(--min-height);
  max-height: var(--max-height);

  &__header,
  &__content,
  &__footer {
    padding-left: var(--padding-x);
    padding-right: var(--padding-x);
  }

  &__header {
    padding-top: var(--padding-y);
    &-inner {
      &.with-border {
        border-bottom: 1px solid var(--outline);
      }
      display: flex;
      gap: 1.2rem;
      padding-bottom: var(--padding-y);
      align-items: center;
      @include media-max($mobile) {
        flex-wrap: wrap;
      }
    }
    .header-append {
      @include media-max($mobile) {
        width: 100%;
      }
      &:empty {display: none}
    }
  }

  &__content {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
