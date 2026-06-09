<script setup lang="ts">
import type { LocaleItemType } from '~~/i18n/types';
import { russia, unitedStates } from '@/assets/icons/flags';
import { Button, DropDown, VIcon } from '@/components/ui';

const { locales, locale, setLocale } = useI18n();

const flagsMap: Record<LocaleItemType['code'], string> = {
  ru: russia,
  en: unitedStates,
};
const setLocaleHandler = async (value: LocaleItemType['code']) => {
  await setLocale(value);
};

const localesList = computed(() => {
  return locales.value.map(locale => ({ ...locale, icon: flagsMap[locale.code] }));
});
</script>

<template>
  <DropDown
    :model-value="locale"
    :items="localesList"
    value="code"
    size="s"
    @update:model-value="setLocaleHandler"
  >
    <template #target="{ open, isOpened, selected, downIcon }">
      <Button
        severity="tretiary"
        variant="text"
        no-hover-bg
        padding="1rem"
        :icon-right="downIcon"
        :icon-left="selected?.icon"
        :rotate-right-icon="isOpened"
        left-icon-no-fill
        label="dropdownValue"
        @click="open"
      >
        {{ selected?.code.toLocaleUpperCase() ?? 'Language' }}
      </Button>
    </template>
    <template #itemInner="{ item }">
      <VIcon :icon="item.icon" no-fill :size="16" style="margin-right: .4rem" />
      {{ item.code.toUpperCase() }}
    </template>
  </DropDown>
</template>
