<script setup lang="ts">
import { RadioButton } from '@/components/ui';
import { useTheme } from '@/composables/UI';

const { themeList, currentTheme, setTheme } = useTheme();
</script>

<template>
  <div class="main-page">
    <div class="theme">
      Theme: {{ currentTheme }}

      <div class="flex gap">
        <RadioButton
          v-for="theme in themeList"
          :key="theme"
          v-model="currentTheme"
          size="s"
          :label="theme"
          :value="theme"
          @update:model-value="setTheme"
        />
      </div>
    </div>
    <div class="bg-surface-container">
      surface-container
    </div>
    <div class="bg-surface-high-container">
      surface-high-container
    </div>
    <div class="bg-surface-highest-container">
      surface-highest-container
    </div>
    <div class="bg-surface-accent-container">
      surface-accent-container
    </div>
    <div class="bg-on-surface color-surface">
      on-surface
    </div>
    <div class="bg-on-surface-secondary color-surface">
      on-surface-secondary
    </div>
    <div class="bg-on-surface-tretiary color-surface">
      on-surface-tretiary
    </div>
    <div class="bg-outline">
      outline
    </div>
    <div class="bg-outline-variant">
      outline-variant
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .theme {
    flex-direction: column;
    label {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      padding: 1rem;
      gap: .5rem;
    }
  }
}
</style>
