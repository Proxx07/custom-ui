<script setup lang="ts">
import { Alert } from '@/components/ui';

const { $toast } = useNuxtApp();
</script>

<template>
  <div id="app-wrapper">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <div class="toasts-container">
      <transition-group name="scale-fade">
        <Alert
          v-for="toast in $toast.list.value"
          :key="toast.id"
          :type="toast.type"
          :close-timeout="toast.closeTimeout"
          :title="toast.title"
          :description="toast.description"
          fluid
          is-toast
          no-icon
          @update:model-value="() => $toast.removeToast(toast.id)"
        />
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
#app-wrapper {
  min-height: 100dvh;
  display: flex;
  background: var(--surface);
}

.toasts-container {
  position: fixed;
  max-width: 30rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  right: 0;
  bottom: 0;
  z-index: 1000;
  pointer-events: none;
  gap: .6rem;
  padding: .6rem;
  > * {
    pointer-events: all;
  }
}
</style>
