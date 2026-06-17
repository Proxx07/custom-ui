<script setup lang="ts">
import {
  Input,
  InputRange,
} from '@/components/ui';

const singleRange = ref(40);

const rangeFrom = ref(20);
const rangeTo = ref(70);

const floatFrom = ref(0);
const floatTo = ref(1);

const fadeFrom = ref(0);
const fadeTo = ref(100);
</script>

<template>
  <div class="components">
    <h2>Ranges</h2>

    <div class="flex-col w-full" style="gap: 3rem; padding-left: 2rem">
      <div style="max-width: 300px">
        <Input
          v-model="singleRange"
          type="number"
          :min="0"
          :max="100"
        />
      </div>
      <div style="max-width: 300px">
        <InputRange
          v-model="singleRange"
          :min="0"
          :max="100"
          fill-bg="on-secondary"
        />
      </div>

      <div style="max-width: 300px">
        <InputRange
          v-model="singleRange"
          :min="0"
          :max="100"
        />
      </div>

      <div class="w-full" style="max-width: 80%">
        <InputRange
          v-model="singleRange"
          :min="0"
          :max="100"
          fill-bg="on-attention"
        />
      </div>
      <div class="w-full" style="max-width: 450px; padding-right: 1rem">
        <InputRange
          v-model="singleRange"
          :min="0"
          :max="100"
          fill-bg="on-error"
        />
      </div>

      <div class="w-full" style="max-width: 450px; padding-right: 1rem">
        <InputRange
          v-model:from="rangeFrom"
          v-model:to="rangeTo"
          range
          :min="0"
          :max="100"
          fill-bg="pearl"
        />
      </div>

      <div class="w-full" style="max-width: 450px">
        <InputRange
          v-model:from="floatFrom"
          v-model:to="floatTo"
          range
          :min="0"
          :max="1"
          :step="0.0001"
          fill-bg="float-bg"
          fluid-fill
        />
      </div>

      <div class="w-full" style="max-width: 450px">
        <InputRange
          v-model:from="fadeFrom"
          v-model:to="fadeTo"
          range
          :min="0"
          :max="100"
          fill-bg="fade-bg"
          fluid-fill
        />
      </div>
    </div>
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
