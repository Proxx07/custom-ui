<script setup lang="ts">
import { phase as phaseIcon } from '@/assets/icons/general';
import { Checkbox, ListItem, VIcon } from '@/components/ui';
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
        <ListItem
          :label="t(`phases.${phase}`)"
          :gap="12"
          :left-slot-size="24"
        >
          <template #prepend>
            <VIcon
              :icon="phaseIcon"
              :color="PHASE_COLORS_RECORD[phase]"
              class="icon"
              :size="24"
              :class="[isHovered && 'rotate']"
            />
          </template>
        </ListItem>
      </template>
    </Checkbox>
  </div>
</template>

<style scoped lang="scss">
.icon {
  @include transition(transform, var(--slow-timing));
  &.rotate {
    transform: rotateZ(180deg);
  }
}
</style>
