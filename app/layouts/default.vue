<script setup lang="ts">
import { WFooter, WHeader } from '@/components/layout';
import { Button } from '@/components/ui';
import { useLoaderStore } from '@/store/loadingState';

const footerHeight = ref(0);
const footerHeightPx = computed(() => `${footerHeight.value}px`);

const { t } = useI18n();
const loaderStore = useLoaderStore();
</script>

<template>
  <div class="wrapper">
    <WHeader />
    <aside>
      <div style="display: flex; align-items: center; gap: 2rem;">
        {{ t('hello-world') }}
        <label for="ch" style="display: flex; align-items: center; gap: .6rem; cursor: pointer">
          <input id="ch" v-model="loaderStore.isLoading" type="checkbox">
          <span class="font-14-n">Toggle loader</span>
        </label>
      </div>
      <br>
      <br>

      <Button severity="tretiary" type="nuxt-link" to="/buttonsPage" label="Buttons page" fluid />
      <br>
      <br>
      <Button severity="tretiary" type="nuxt-link" to="/dropDowns" label="UI Components" fluid />
    </aside>
    <main class="content">
      <slot />
    </main>
    <WFooter v-model:height="footerHeight" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  --gap: 5px;
  --header-height: 41px;
  --footer-height: v-bind(footerHeightPx);
  --aside-height: calc(100dvh - var(--footer-height) - var(--header-height) - var(--gap));
  display: grid;
  grid-template-columns: 330px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: var(--gap);
  flex-grow: 1;
  position: relative;
}

aside {
  position: sticky;
  top: calc(var(--header-height));
  height: var(--aside-height);
  overflow-y: auto;
  background: var(--surface-container);
  padding: 1rem;
  transition: var(--transition-slow);
}

.content {
  display: flex;
  flex-grow: 1;
  padding-bottom: 6rem;
  overflow-x: hidden;
  overflow-y: auto;
  & > * {
    flex-grow: 1;
  }
}
</style>
