<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});
const { size = 'medium', invalid = false } = defineProps<{
  size?: 'small' | 'medium' | 'large'
  invalid?: boolean
}>();
const $attrs = useAttrs();
</script>

<template>
  <div class="input-wrapper" :class="[invalid && 'invalid']">
    <input type="text" v-bind="$attrs">
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  --border: var(--outline);
  --bg: var(--surface-low-container);
  --color: var(--on-surface);
  --paddding: .6rem 1.6rem;
  --radius: var(--radius-sm);

  &:hover, &:focus-within {
    --border: var(--outline-variant);
  }

  &.invalid {
    --color: var(--on-error);
    --border: currentColor;
  }

  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--color);
  padding: var(--paddding);
  border-radius: var(--radius);
  transition: var(--transition-fast);

  display: flex;
  align-items: center;
  gap: 2rem;
}
input {
  outline: none;
  background: transparent;
  color: inherit;
  border: none;
  font: var(--font-16-n);
  &::placeholder {
    color: var(--on-surface-secondary);
  }
}
</style>
