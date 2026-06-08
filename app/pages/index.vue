<script setup lang="ts">
import { useTheme } from "@/composables/UI/useTheme";
import { useUserStore } from "@/store/user";

import Button from "@/components/ui/Button.vue";

const {themeList, currentTheme, setTheme} = useTheme();
const userStore = useUserStore();
</script>

<template>
  <div class="main-page">

    <div class="theme">

      Theme: {{currentTheme}}

      <div>
        <label v-for="theme in themeList" :key="theme" :for="theme">
          <input
              v-model="currentTheme"
              type="radio"
              name="theme"
              :id="theme"
              :value="theme"
              @change="setTheme(theme)"
          />
          {{theme}}
        </label>
      </div>

      <Button
          @click="userStore.setUser('TEST_USER')"
      >
        Set user
      </Button>
    </div>
    <div class="bg-surface-container">surface-container</div>
    <div class="bg-surface-high-container">surface-high-container</div>
    <div class="bg-surface-highest-container">surface-highest-container</div>
    <div class="bg-surface-accent-container">surface-accent-container</div>
    <div class="bg-on-surface color-surface">on-surface</div>
    <div class="bg-on-surface-secondary color-surface">on-surface-secondary</div>
    <div class="bg-on-surface-tretiary color-surface">on-surface-tretiary</div>
    <div class="bg-outline">outline</div>
    <div class="bg-outline-variant">outline-variant</div>
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
