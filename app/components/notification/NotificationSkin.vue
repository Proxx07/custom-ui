<script setup lang="ts">
defineProps<{
  type: string
  typeColorCls: string
  name: string
  exterior: string
  image: string
}>();
</script>

<template>
  <div class="skin">
    <div class="skin-detail">
      <div v-if="type" class="font-12-n" :class="[typeColorCls]">
        {{ type }}
      </div>
      <div class="font-14-m spoiler">
        {{ name }}
        <span v-if="exterior" class="color-on-surface-tertiary">
          {{ exterior }}
        </span>
      </div>
    </div>
    <img :src="image" width="70" alt="/">
  </div>
</template>

<style scoped lang="scss">
.skin {
  padding: .8rem .6rem .8rem 1.6rem;
  background: var(--surface-container);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .8rem;
  &-detail {
    max-width: 14rem;
  }
}
</style>
