<script setup lang="ts">
import { CurrencySwitcher, LangSwitcher, ThemeSwitcher } from '@/components/globalSelects';
import { type IEmit, type IProps, useElementHeight } from '@/composables/useElementHeight';

const props = defineProps<IProps>();
const emit = defineEmits<IEmit>();
const { element: footer } = useElementHeight(props, emit);
const { isScrolling, directions, y } = useWindowScroll();

const transform = computed(() => {
  if (y.value === 0) return '0';
  return props.height ? '0' : '100%';
});

watch(() => isScrolling.value, (value) => {
  if (!value || !footer.value) return;
  const { top, bottom } = directions;
  const isScrollToBottom = !top && bottom;
  emit('update:height', isScrollToBottom ? 0 : footer.value.offsetHeight);
});
</script>

<template>
  <footer ref="footer">
    <div class="right-part">
      <CurrencySwitcher />
      <LangSwitcher />
      <ThemeSwitcher />
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  position: fixed;
  inset: 0;
  top: auto;
  grid-column: span 2;
  transition: var(--transition-slow);
  transform: translateY(v-bind(transform));
  background: var(--outline);
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.right-part {
  margin-left: auto;
  display: flex;
  align-items: center;
}
</style>
