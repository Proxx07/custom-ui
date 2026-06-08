<script setup lang="ts">
import { Button, DropDown } from "~/components/ui";
import {type ThemeModes, useTheme} from "~/composables/UI/useTheme";
import {capitalizeFirstLetter} from "~/utils/textFormatters";
const { themeList, currentTheme, setTheme } = useTheme();
</script>

<template>
  <DropDown
    v-model="currentTheme"
    :items="themeList"
    size="s"
    style="min-width: 120px"
    class="theme-switcher"
    @update:model-value="setTheme($event as ThemeModes)"
  >
    <template #target="{open, isOpened, selected, downIcon}">
      <Button
        severity="tretiary"
        variant="text"
        no-hover-bg
        padding="1rem"
        :icon-right="downIcon"
        :rotate-right-icon="isOpened"
        label="dropdownValue"
        @click="open"
      >
        {{selected ? capitalizeFirstLetter(selected) + ' mode' : 'Select theme' }}
      </Button>
    </template>
    <template #itemInner="{item}">
      {{ capitalizeFirstLetter(item) }} mode
    </template>
  </DropDown>
</template>