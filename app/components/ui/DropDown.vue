<script setup lang="ts" generic="T">
import { ref, computed, reactive, nextTick } from 'vue';
import { useToggle, useElementBounding, onClickOutside } from '@vueuse/core';
import { vElementHover } from '@vueuse/components';
import Button from "~/components/ui/Button.vue";
import type { ButtonProps } from "~/composables/UI/types/button";
import {chevronDown} from "~/assets/icons/arrows";

const {
  size = 'm',
  value,
  modelValue,
  items = [],
  itemLabel,
  label = 'Nothing to show',
  downIcon = chevronDown,
  hideDownIcon = false,
  toggleOnHover = false,
} = defineProps<{
  modelValue?: any
  items?: T[]
  value?: keyof T
  itemLabel?: keyof T
  label?: string
  size?: ButtonProps['size']
  downIcon?: string
  hideDownIcon?: boolean
  toggleOnHover?: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: T | T[keyof T]): void
}>();

defineSlots<{
  target: (props: { open: () => void; isOpened: boolean; selected: T | undefined; downIcon?: string }) => unknown
  targetInner: (props: { selected: T | undefined }) => unknown
  item: (props: { item: T; selected: T | undefined; isSelected: boolean }) => unknown
  itemInner: (props: { item: T; selected: T | undefined; isSelected: boolean }) => unknown
}>();

const GAP = 8;
const [isOpen, toggle] = useToggle();

const dropdown = ref<HTMLElement>();
const dropdownList = ref<HTMLElement>();

const dropUp = ref(false);
const positions = reactive({ x: '', y: '', w: '' });
const { left, width, top, bottom } = useElementBounding(dropdown);

const selectedItem = computed<T | undefined>(() => {
  if (modelValue == null) return undefined;
  return value ? items.find((item) => item[value] === modelValue) : (modelValue as T);
});

const targetText = computed(() => {
  if (!selectedItem.value) return modelValue ?? label;
  return itemLabel ? String(selectedItem.value[itemLabel]) : String(selectedItem.value);
});

const updatePosition = () => {
  if (!dropdownList.value) return;

  const listHeight = dropdownList.value.offsetHeight;
  const spaceBelow = window.innerHeight - bottom.value;

  dropUp.value = (listHeight + GAP > spaceBelow) && (top.value > spaceBelow);

  positions.x = `${left.value}px`;
  positions.w = `${width.value}px`;
  positions.y = dropUp.value
      ? `${window.innerHeight - top.value + GAP}px`
      : `${bottom.value + GAP}px`;
};

const { isOutside } = useMouseInElement(dropdownList)

const toggleDropdown = async () => {
  toggle(!isOpen.value);

  if (isOpen.value) {
    await nextTick();
    updatePosition();
  }
};

const targetHoverHandler = (isHovered: boolean) => {
  if (!toggleOnHover) return;
  if (isHovered) {
    toggleDropdown();
  }
  else {
    setTimeout(() => {
      if (isOutside.value) toggle(false);
    }, 100);
  }
}

const selectItem = (item: T) => {
  emit('update:modelValue', value ? item[value] : item);
  isOpen.value = false;
};

onClickOutside(dropdown, () => {
  isOpen.value = false;
}, { ignore: [dropdownList] });

watch(isOutside, (value) => {
  if (!toggleOnHover) return;
  if (value) toggle(false);
})
</script>

<template>
  <div class="dropdown-wrapper" ref="dropdown">
    <slot name="target" :open="toggleDropdown" :is-opened="isOpen" :selected="selectedItem" :downIcon="downIcon">
      <Button
        bg-color="surface-high-container"
        hover-bg-color="surface-highest-container"
        :size="size"
        :icon-right="hideDownIcon ? undefined : downIcon"
        fluid
        :rotate-right-icon="isOpen"
        @click="toggleDropdown"
        v-element-hover="targetHoverHandler"
      >
        <slot name="targetInner" :selected="selectedItem">
          {{ targetText }}
        </slot>
      </Button>
    </slot>

    <Teleport to="#teleports">
      <transition name="slide-up">
        <div
          v-if="isOpen"
          ref="dropdownList"
          class="dropdown-list bg-surface-high-container"
          :class="{ 'open-to-top': dropUp }"
          :style="{
          '--x': positions.x,
          '--y': positions.y,
          '--w': positions.w
          }"
        >
          <template v-for="(item, i) in items" :key="i">
            <slot
              name="item"
              :item="item"
              :selected="selectedItem"
              :is-selected="selectedItem === item"
            >
              <Button
                bg-color="surface-high-container"
                hover-bg-color="surface-highest-container"
                :text-color="selectedItem === item ? 'on-secondary' : undefined"
                :size="size"
                :padding="size === 's' ? '1rem' : undefined"
                fluid
                @click="selectItem(item)"
              >
                <slot
                  name="itemInner"
                  :item="item"
                  :selected="selectedItem"
                  :is-selected="selectedItem === item"
                >
                  {{ itemLabel ? String(item[itemLabel as keyof T]) : String(item) }}
                </slot>
              </Button>
            </slot>
          </template>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.dropdown-wrapper {
  justify-self: flex-start;
  align-self: flex-start;
}

.dropdown-list {
  position: fixed;
  top: var(--y);
  left: var(--x);
  width: var(--w);
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 0.4rem;
  gap: 0.2rem;
  border: 1px solid var(--outline);
  border-radius: var(--radius-sm);
  max-height: 44rem;
  overflow-y: auto;
  min-width: max-content;

  &.open-to-top {
    top: auto;
    bottom: var(--y);
  }
}
</style>