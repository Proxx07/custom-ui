<script setup lang="ts">
import type { Ref } from 'vue';
import type { ISocialsLink, NavListItem } from '@/composables/useNavigations';
import { support } from '@/assets/icons/features';
import { loader } from '@/assets/icons/general';
import { FooterNav } from '@/components/footerElements';
import { CurrencySwitcher, LangSwitcher, ThemeSwitcher } from '@/components/globalSelects';
import { Button } from '@/components/ui';

defineProps<{
  navList: NavListItem[]
  socials: ISocialsLink[]
}>();

const { $chat } = useNuxtApp();
const { t } = useI18n();
const footer = ref<HTMLElement>();
const { y } = useWindowScroll();
const { height, update } = useElementBounding(footer, { immediate: false });

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
    <div class="left-part">
      <Button
        severity="tertiary"
        variant="text"
        :label="t('support')"
        :icon-left="$chat.isInitializing ? loader : support"
        :disabled="$chat.isInitializing"
        size="s"
        no-hover-bg
        hover-text-color="on-surface-tertiary"
        @click="$chat.open"
      />

      <FooterNav :nav-list="navList" :socials="socials" />
    </div>
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

  padding: 0 var(--container-padding-x) 0 0;
  background: var(--outline);
}

.right-part {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.left-part {
  display: flex;
  align-items: center;
}
</style>
