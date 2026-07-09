<script setup lang="ts">
import type { Ref } from 'vue';
import { CurrencySwitcher, LangSwitcher, ThemeSwitcher } from '@/components/globalSelects';

const footer = ref<HTMLElement>();
const { y } = useWindowScroll();
const { height, update } = useElementBounding(footer);

const isFooterVisible = ref(false);
const transform = computed(() => isFooterVisible.value ? 'translateY(0)' : 'translateY(100%)');

const onScroll = useThrottleFn((value: number, oldValue: number) => {
  if (!oldValue) return;
  isFooterVisible.value = value - oldValue < 0;
}, 250);

watch(y, onScroll);

onMounted(() => {
  update();
  isFooterVisible.value = true;
});

defineExpose<{
  height: Ref<number>
  isFooterVisible: Ref<boolean>
}>({ height, isFooterVisible });
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
  transform: v-bind(transform);
  @include transition(transform, var(--slow-timing));

  display: flex;
  align-items: center;

  padding: 0 var(--container-padding-x);
  background: var(--outline);
}

.right-part {
  margin-left: auto;
  display: flex;
  align-items: center;
}
</style>
