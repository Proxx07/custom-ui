<script setup lang="ts">
import { phase as phaseIcon } from '@/assets/icons/general';
import { Checkbox, VIcon } from '@/components/ui';
import { PHASE_COLORS_RECORD, PHASE_LIST, type PhaseQueryTypes } from '@/composables/useItemFades';

const props = defineProps<{
  modelValue: PhaseQueryTypes[]
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: PhaseQueryTypes[]): void
}>();

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value: PhaseQueryTypes[]) {
    emit('update:modelValue', value);
  },
});

const { t } = useI18n();
</script>

<template>
  <div class="flex-col gap">
    <Checkbox
      v-for="phase in PHASE_LIST"
      :key="phase"
      v-model="model"
      :value="phase"
      fluid
    >
      <template #default="{ isHovered }">
        <div class="item-label">
          <VIcon
            :icon="phaseIcon"
            :color="`var(--${PHASE_COLORS_RECORD[phase]})`"
            class="icon"
            :class="[isHovered && 'rotate']"
          />
          <div class="color-on-surface">
            {{ t(`phases.${phase}`) }}
          </div>
        </div>
      </template>
    </Checkbox>
  </div>
</template>

<style scoped lang="scss">
.item-label {
  width: 100%;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  color: var(--on-surface-tretiary);
  padding: .2rem 0;
}

.icon {
  transition: transform var(--slow-timing);
  &.rotate {
    transform: rotateZ(180deg);
  }
}
</style>
