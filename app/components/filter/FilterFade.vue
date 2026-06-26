<script setup lang="ts">
import { Input, InputRange } from '@/components/ui';

const props = defineProps<{
  min: number
  max: number
}>();

const emit = defineEmits<{
  (e: 'update:min', value: number): void
  (e: 'update:max', value: number): void
}>();

const minModel = computed({
  get() {
    return props.min;
  },
  set(value: number) {
    emit('update:min', value);
  },
});

const maxModel = computed({
  get() {
    return props.max;
  },
  set(value: number) {
    emit('update:max', value);
  },
});
</script>

<template>
  <div class="grid-wrapper">
    <InputRange
      v-model:from="minModel"
      v-model:to="maxModel"
      range
      :min="80"
      :max="100"
      :step="1"
      fill-bg="fade-bg"
      fluid-fill
      class="colspan-2"
      value-suffix="%"
      value-bg="surface-low-container"
      show-value
    />
    <Input
      v-model="minModel"
      placeholder="80"
      size="s"
      type="number"
      :clearable="false"
      :max="100"
      :min="80"
    >
      <template #prefix>
        %
      </template>
    </Input>

    <Input
      v-model="maxModel"
      placeholder="100"
      type="number"
      size="s"
      :clearable="false"
      :max="100"
      :min="80"
    >
      <template #prefix>
        %
      </template>
    </Input>
  </div>
</template>

<style scoped lang="scss">
.grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem .8rem;
  :deep(input) {
    width: 7rem;
  }
}
</style>
