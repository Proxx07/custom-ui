<script setup lang="ts">
import type { INotification } from '@/composables/useNotifications';

defineProps<{
  notification: INotification
}>();
</script>

<template>
  <div class="notification">
    {{ notification }}
  </div>
</template>

<style scoped lang="scss">

</style>
