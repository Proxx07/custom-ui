<script setup lang="ts">
import { Button, Modal } from '@/components/ui';

const modalOpened = ref(false);
</script>

<template>
  <div class="components">
    <Button label="Open modal" size="s" severity="secondary" @click="modalOpened = true" />
    <Modal
      v-model="modalOpened"
      title="TEST MODAL"
      back-button
    >
      <template #content>
        <div
          style="min-height: 400vh;
          background: repeating-linear-gradient(to bottom, var(--secondary), var(--on-secondary) 20px, var(--secondary) 40px);"
        />
      </template>
    </Modal>
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
