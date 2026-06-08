<script setup lang="ts">
import {useWindowScroll} from "@vueuse/core";
import {watch} from "vue";
import {useElementHeight} from "@/composables/useElementHeight";
import type {IEmit, IProps} from "@/composables/useElementHeight/types";
import ThemeSwitcher from "~/components/globalSelects/ThemeSwitcher.vue";
import LangSwitcher from "~/components/globalSelects/LangSwitcher.vue";

const props = defineProps<IProps>();
const emit = defineEmits<IEmit>();
const { element: footer } = useElementHeight(props, emit);
const { isScrolling, directions, y } = useWindowScroll();

const transform = computed(() => {
  if (y.value === 0) return '0';
  return props.height ? '0' : '100%'
})

watch(() => isScrolling.value, (value) => {
  if (!value || !footer.value) return;
  const {top, bottom} = directions;
  const isScrollToBottom = !top && bottom;
  emit('update:height',  isScrollToBottom ? 0 : footer.value.offsetHeight);
});
</script>

<template>
  <footer ref="footer">
    <div class="right-part">
      <LangSwitcher/>
      <ThemeSwitcher/>
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
}

.right-part {
  margin-left: auto;
  display: flex;
  align-items: center;
}
</style>