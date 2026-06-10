<script setup lang="ts" generic="T, V extends keyof T = never">
import type { DropDownEmits, DropDownProps, DropDownSlots, DropDownValue } from './types';
import { vElementHover } from '@vueuse/components';
import { chevronDown } from '@/assets/icons/arrows';
import { Button } from '../index';

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
  loading = false,
} = defineProps<DropDownProps<T, V>>();

const emit = defineEmits<DropDownEmits<T, V>>();

defineSlots<DropDownSlots<T>>();

const GAP = 8;
const [isOpen, toggle] = useToggle();
const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

const dropdown = ref<HTMLElement>();
const dropdownList = ref<HTMLElement>();

const dropUp = ref(false);
const positions = reactive({ x: '', y: '', w: '' });
const { left, width, top, bottom } = useElementBounding(dropdown);

const selectedItem = computed<T | undefined>(() => {
  if (modelValue == null) return undefined;
  const model = modelValue as T | T[V];
  return value ? items.find(item => item[value] === model) : (model as T);
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

const { isOutside } = useMouseInElement(dropdownList);

const openDropDown = async () => {
  if (loading || isOpen.value) return;
  toggle(true);
  await nextTick();
  updatePosition();
};

const closeDropDown = () => {
  toggle(false);
};

const toggleDropDown = () => {
  if (isOpen.value) closeDropDown();
  else openDropDown();
};

const targetHoverHandler = (isHovered: boolean) => {
  if (!toggleOnHover || !canHover.value) return;
  if (isHovered) {
    openDropDown();
  }
  else {
    setTimeout(() => {
      if (isOutside.value) closeDropDown();
    }, 100);
  }
};

const selectItem = (item: T) => {
  emit('update:modelValue', (value ? item[value] : item) as DropDownValue<T, V>);
  closeDropDown();
};

onClickOutside(dropdown, () => {
  closeDropDown();
}, { ignore: [dropdownList] });

watch(isOutside, (value) => {
  if (!toggleOnHover || !canHover.value) return;
  if (value) closeDropDown();
});
</script>

<template>
  <div ref="dropdown" class="dropdown-wrapper">
    <slot
      name="target"
      :open-drop-down="openDropDown"
      :close-drop-down="closeDropDown"
      :toggle-drop-down="toggleDropDown"
      :is-opened="isOpen" :selected="selectedItem"
      :down-icon="downIcon"
      :loading="loading"
    >
      <Button
        v-element-hover="targetHoverHandler"
        bg-color="surface-high-container"
        hover-bg-color="surface-highest-container"
        :size="size"
        :icon-right="hideDownIcon ? undefined : downIcon"
        fluid
        :loading="loading"
        :rotate-right-icon="isOpen"
        @click="toggleDropDown"
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
            '--w': positions.w,
          }"
        >
          <template v-if="!items.length || !items">
            <div
              class="font-16-n text-center"
              style="padding: 2rem 0;"
            >
              No items...
            </div>
          </template>
          <template v-for="(item, i) in items" :key="i">
            <slot
              name="item"
              :item="item"
              :selected="selectedItem"
              :is-selected="selectedItem === item"
              :select-item="() => selectItem(item)"
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
