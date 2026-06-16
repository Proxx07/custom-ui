<script setup lang="ts">
import {
  Button,
  Checkbox,
  RadioButton,
  Switcher,
} from '@/components/ui';
import { useLoaderStore } from '@/store/loadingState';

const loaderStore = useLoaderStore();

const check = ref(false);

const checkGroup = ref<number[]>([]);
const checkGroupOptions = Array.from({ length: 4 }, (_, i) => ({ id: i + 1, name: `label ${i + 1}` }));

const radioValue = ref<number>();

const switchVal = ref(false);
</script>

<template>
  <div class="components">
    <h2>Checkboxes</h2>
    <div class="flex items-center gap">
      <Checkbox v-model="check" label="Checkbox label" :loading="loaderStore.isLoading" />
      <Checkbox v-model="check" label="Checkbox label" size="s" :loading="loaderStore.isLoading" />
    </div>
    <div class="w-full" />
    <div class="flex-col gap">
      <span>selected: {{ checkGroup }}</span>

      <Checkbox
        v-for="option in checkGroupOptions"
        :key="option.id"
        v-model="checkGroup"
        :value="option.id"
        :label="option.name"
      >
        <template #default="{ updateOnlyCurrent, isHovered, label }">
          <div class="flex items-center gap">
            {{ label }}
            <Button
              v-if="isHovered"
              variant="text"
              severity="secondary"
              label="ONLY"
              size="s"
              padding=".1rem"
              class="ml-auto"
              @click="updateOnlyCurrent"
            />
          </div>
        </template>
      </Checkbox>
    </div>
    <hr>
    <div class="flex items-center gap">
      <RadioButton v-model="radioValue" :value="1" label="Radio m" :loading="loaderStore.isLoading" />
      <RadioButton v-model="radioValue" :value="2" label="Radio s" size="s" :loading="loaderStore.isLoading" />
    </div>
    <div class="w-full" />
    <div class="flex-col gap">
      <span>selected: {{ radioValue }}</span>

      <RadioButton
        v-for="option in checkGroupOptions"
        :key="option.id"
        v-model="radioValue"
        :value="option.id"
        :label="option.name"
      />
    </div>

    <hr>

    <div class="flex items-center gap">
      <Switcher v-model="switchVal" label="Switcher label" />
      <Switcher v-model="switchVal" label="Switcher label" size="s" />
    </div>
    <Switcher v-model="switchVal" :loading="loaderStore.isLoading" label="Loading" />
  </div>
</template>

<style scoped lang="scss">
.components {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: flex-start;
}
h2, hr {
  width: 100%;
}
</style>
