<script setup lang="ts">
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
</script>

<template>
  <header>
    <span>{HEADER}</span>
    <span>{{ userStore.user }}</span>
  </header>
</template>

<style scoped lang="scss">
header {
  position: sticky;
  top: 0;
  padding: 1rem;
  grid-column: span 2;
  background: var(--surface-container);
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
