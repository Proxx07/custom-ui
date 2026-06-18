<script setup lang="ts">
import { cross } from '@/assets/icons/actions';
import { Button, Checkbox, Drawer } from '@/components/ui';
import { useDrawersStore } from '@/store/drawersState';
import { useLoaderStore } from '@/store/loadingState';

const { t } = useI18n();
const loaderStore = useLoaderStore();
const drawersState = useDrawersStore();
</script>

<template>
  <aside>
    {{ t('hello-world') }}
    <Checkbox v-model="loaderStore.isLoading" label="Toggle loader" />

    <Button severity="tretiary" type="nuxt-link" to="/buttonsPage" label="Buttons page" fluid />
    <Button severity="tretiary" type="nuxt-link" to="/ui-components" label="UI Components" fluid />
  </aside>
  <Drawer
    v-model="drawersState.asideDrawer"
  >
    <template #header="{ close }">
      <div class="flex gap w-full">
        <div class="flex-col">
          {{ t('hello-world') }}
          <Checkbox v-model="loaderStore.isLoading" label="Toggle loader" />
        </div>
        <Button severity="destructive" variant="text" class="ml-auto" :icon-left="cross" size="s" @click="close" />
      </div>
    </template>
    <template #default="{ close }">
      <Button
        severity="tretiary"
        type="nuxt-link"
        to="/buttonsPage"
        label="Buttons page"
        fluid
        @click="close"
      />
      <br>
      <br>
      <Button
        severity="tretiary"
        type="nuxt-link"
        to="/ui-components"
        label="UI Components"
        fluid
        @click="close"
      />
    </template>
  </Drawer>
</template>

<style scoped lang="scss">
aside {
  position: sticky;
  top: calc(var(--header-height));
  height: var(--aside-height);
  overflow-y: auto;
  background: var(--surface-container);
  padding: 1rem;
  transition: var(--transition-slow);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @include media-max($tablet) {
    display: none;
  }
}
</style>
