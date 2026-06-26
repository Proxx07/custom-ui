<script setup lang="ts">
import type { ButtonProps, ButtonSlots } from './types';
import { LazyNuxtLinkLocale } from '#components';
import { loader } from '@/assets/icons/general';
import VIcon from '../VIcon.vue';

const {
  severity = 'primary',
  size = 'm',
  type = 'button',
  label = '',
  padding = '',
  textColor = '',
  hoverTextColor = '',
  bgColor = '',
  hoverBgColor = '',
} = defineProps<ButtonProps>();

defineSlots<ButtonSlots>();

const slots = useSlots();

const buttonRef = ref<HTMLElement>();
const isHovered = useElementHover(buttonRef);

const tag = computed(() => type === 'nuxt-link' ? LazyNuxtLinkLocale : type);
const isOnlyIcon = computed(() => !label && !slots.default);

const pd = computed(() => {
  if (padding) return padding;
  if (size === 's') return '1rem 1.6rem .9rem';
  if (size === 'l') return '1.5rem 2.4rem 1.4rem';
  if (size === 'xl') return '1.8rem 2.4rem 1.7rem';
  return '1.2rem 2.4rem 1.1rem';
});

const iconSize = computed(() => {
  if (!isOnlyIcon.value) return 20;
  if (size === 's') return 20;
  return 24;
});

const colorVars = computed(() => {
  if (textColor || hoverTextColor || bgColor || hoverBgColor) {
    return {
      ...(bgColor && { '--bg': `var(--${bgColor})` }),
      ...(hoverBgColor && { '--hover-bg': `var(--${hoverBgColor})` }),
      ...(textColor && { '--text': `var(--${textColor})` }),
      ...(hoverTextColor && { '--hover-text': `var(--${hoverTextColor})` }),
    };
  }
  return undefined;
});
</script>

<template>
  <component
    :is="tag"
    ref="buttonRef"
    class="w-button"
    :class="[
      severity, `size-${size}`, variant,
      fluid && 'fluid',
      noHoverBg && 'no-hover-bg',
      isOnlyIcon && 'icon-only',
      hoverSeverity && `hover-${hoverSeverity}`,
      loading && 'loading',
    ]"
    :style="colorVars"
  >
    <slot name="prepend" :is-hovered="isHovered">
      <VIcon
        v-if="iconLeft"
        :icon="(isOnlyIcon && loading) ? loader : iconLeft"
        :size="iconSize"
        :no-fill="leftIconNoFill"
        class="icon"
        :class="[(!loading && rotateLeftIcon) && 'rotate']"
      />
    </slot>
    <slot :is-hovered="isHovered">
      {{ label }}
    </slot>
    <slot name="append" :is-hovered="isHovered">
      <VIcon
        v-if="iconRight || (!isOnlyIcon && loading)"
        :icon="(!loading && iconRight) ? iconRight : loader"
        :size="iconSize"
        :no-fill="rightIconNoFill"
        class="icon ml-auto"
        :class="[(!loading && rotateRightIcon) && 'rotate']"
      />
    </slot>
  </component>
</template>

<style scoped lang="scss">
.w-button {
  --border: transparent;
  --radius: var(--radius-sm);
  --gap: .6rem;
  --padding: v-bind(pd);
  --font: var(--font-16-n);
  --hover-text: var(--text);

  &.hover-primary { --hover-text: var(--primary) }
  &.hover-secondary { --hover-text: var(--on-secondary) }
  &.hover-tretiary { --hover-text: var(--on-surface) }
  &.hover-destructive { --hover-text: var(--on-error) }
  &.hover-attention { --hover-text: var(--on-attention) }

  line-height: 20px !important;
  text-decoration: none;

  &.primary {
    --bg: var(--primary);
    --text: var(--on-surface);
    --hover-bg: var(--primary-variant);
    &.outlined, &.text {
      --text: var(--primary);
    }
  }

  &.secondary {
    --bg: var(--secondary);
    --text: var(--on-secondary);
    --hover-bg: var(--secondary);
  }

  &.tretiary, &.destructive, &.attention {
    --bg: var(--outline);
    --text: var(--on-surface);
    --hover-bg: var(--surface-highest-container);
  }

  &.destructive {
    --text: var(--on-error);
  }

  &.attention {
    --text: var(--on-attention);
  }

  &.outlined {
    --bg: transparent;
    --border: var(--outline-variant);
    --hover-bg: var(--surface-high-container);
  }

  &.text {
    --bg: transparent;
    --hover-bg: var(--surface-high-container);
  }

  &.no-hover-bg {
    --hover-bg: transparent;
  }

  &.size-s {
    --gap: .4rem;
    --font: var(--font-14-n);
  }

  &.size-l {
    --gap: .8rem;
    --font: var(--font-18-n);
  }

  &.size-xl {
    --font: var(--font-18-n);
  }

  &.icon-only {
    &.size-s, &.size-m{
      --padding: .95rem;
    }

    &.size-l {
      --padding: 1.25rem;
    }
    &.size-xl {
      --padding: 1.55rem;
    }
  }

  background: var(--bg);
  color: var(--text);
  border-color: var(--border);

  gap: var(--gap);
  padding: var(--padding);
  font: var(--font);

  border-radius: var(--radius);

  transition: opacity var(--fast-timing), background var(--fast-timing), color var(--fast-timing);

  &:not([disabled], .loading) {
    &:hover,
    &.active {
      background: var(--hover-bg);
      color: var(--hover-text);
    }
  }

  display: inline-flex;
  cursor: pointer;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  box-shadow: none;
  &.fluid {
    width: 100%;
  }

  .icon {
    transition: var(--transition-fast);
    &.rotate {
      transform: rotateZ(180deg);
    }
  }

  &[disabled] {
    opacity: .7;
    cursor: not-allowed;
  }

  &.loading {
    cursor: wait;
  }
}
</style>
