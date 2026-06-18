<script setup lang="ts">
import { burgerMenu } from '@/assets/icons/general';
import { Button } from '@/components/ui';
import { useDrawersStore } from '@/store/drawersState';

const drawersState = useDrawersStore();
</script>

<template>
  <header>
    <span>{HEADER}</span>

    <Button
      severity="tretiary"
      variant="text"
      class="ml-auto"
      :icon-left="burgerMenu"
      @click="drawersState.showAsideDrawer"
    />
  </header>
</template>

<style scoped lang="scss">
header {
  padding: var(--container-padding-y) var(--container-padding-x);
  position: sticky;
  top: 0;
  grid-column: span 2;
  background: var(--surface-container);
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
