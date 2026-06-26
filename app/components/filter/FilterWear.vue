<script setup lang="ts">
import { Button, Checkbox, Input, InputRange } from '@/components/ui';
import { EXTERIORS_LIST, type ExteriorTypes } from '@/composables/useSkinItem';

const props = defineProps<{
  min: number
  max: number
  exterior: ExteriorTypes[]
}>();

const emit = defineEmits<{
  (e: 'update:min', value: number): void
  (e: 'update:max', value: number): void
  (e: 'update:exterior', value: ExteriorTypes[]): void
}>();

const { t } = useI18n();

const minFloat = computed({
  get() {
    return props.min;
  },
  set(value: number) {
    emit('update:min', value);
  },
});

const maxFloat = computed({
  get() {
    return props.max;
  },
  set(value: number) {
    emit('update:max', value);
  },
});

const exteriorModel = computed({
  get() {
    return props.exterior;
  },
  set(value: ExteriorTypes[]) {
    emit('update:exterior', value);
  },
});
</script>

<template>
  <div class="grid-wrapper">
    <InputRange
      v-model:from="minFloat"
      v-model:to="maxFloat"
      range
      :min="0"
      :max="1"
      :step="0.0001"
      hide-value
      fill-bg="float-bg"
      fluid-fill
      class="colspan-2"
    />

    <Input
      v-model="minFloat"
      placeholder="0"
      size="s"
      type="number"
      :clearable="false"
      :max="1"
      :min="0"
    />

    <Input
      v-model="maxFloat"
      placeholder="1"
      type="number"
      size="s"
      :clearable="false"
      :max="1"
      :min="0"
    />

    <div class="colspan-2 flex-col gap">
      <Checkbox
        v-for="ext in EXTERIORS_LIST"
        :key="ext"
        v-model="exteriorModel"
        :value="ext"
        fluid
      >
        <template #default="{ isHovered, updateOnlyCurrent }">
          <div class="flex w-full">
            <div style="padding: .4rem 0 .3rem">
              {{ t(`exterior.${ext}`) }}
            </div>
            <transition name="fade">
              <Button
                v-if="isHovered"
                variant="outlined"
                severity="secondary"
                label="ONLY"
                size="s"
                padding=".2rem .4rem"
                class="ml-auto"
                @click="updateOnlyCurrent"
              />
            </transition>
          </div>
        </template>
      </Checkbox>
    </div>
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
