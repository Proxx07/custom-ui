<script setup lang="ts">
import type { CardSizeType } from '@/composables/UI';

const props = defineProps<{
  label: string
  cardSize: CardSizeType
  isSouvenir?: boolean
  isStatTrak?: boolean
  color?: string
}>();

const textColor = props.color ? props.color : props.isSouvenir ? 'var(--souvenir)' : props.isStatTrak ? 'var(--stattrak)' : 'var(--on-surface-tertiary)';
</script>

<template>
  <div
    :class="[cardSize === 'large' ? 'font-14-n' : 'font-12-n']"
    :style="{ color: textColor }"
  >
    {{ label }}
  </div>
</template>
