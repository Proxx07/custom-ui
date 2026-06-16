<script setup lang="ts">
import { Button, Modal } from '@/components/ui';

const modalOpened = ref(false);
</script>

<template>
  <div class="components">
    <Button label="Open modal" size="s" severity="secondary" @click="modalOpened = true" />
    <Modal v-model="modalOpened" />
  </div>
</template>

<style scoped lang="scss">
.components {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>
