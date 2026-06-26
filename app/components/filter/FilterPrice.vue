<script setup lang="ts">
import type { ICurrency } from '@/composables/useCurrencies';
import { bestPrice } from '@/assets/icons/general';
import { Input, Switcher, VIcon } from '@/components/ui';

const props = defineProps<{
  min?: number
  max?: number
  bestPrice: boolean

  currencySymbol: ICurrency['symbol']
  bestPriceEnabled: boolean
}>();

const emit = defineEmits<{
  (e: 'update:min', value: number): void
  (e: 'update:max', value: number): void
  (e: 'update:bestPrice', value: boolean): void
}>();

const minPrice = computed({
  get() {
    return props.min;
  },
  set(value: number) {
    emit('update:min', value);
  },
});

const maxPrice = computed({
  get() {
    return props.max;
  },
  set(value: number) {
    emit('update:max', value);
  },
});

const onlyBestPrice = computed({
  get() {
    return props.bestPrice;
  },
  set(value: boolean) {
    emit('update:bestPrice', value);
  },
});
</script>

<template>
  <div class="grid-wrapper">
    <Input
      v-model="minPrice"
      placeholder="0"
      size="s"
      type="number"
    >
      <template #prefix>
        {{ currencySymbol }}
      </template>
    </Input>

    <Input
      v-model="maxPrice"
      placeholder="10000"
      type="number"
      size="s"
    >
      <template #prefix>
        {{ currencySymbol }}
      </template>
    </Input>

    <Switcher
      v-model="onlyBestPrice"
      reverse-direction
      class="colspan-2"
    >
      <template #default>
        <div class="flex mr-auto gap items-center">
          <VIcon :size="20" :icon="bestPrice" color="var(--best-price)" />
          Best price only
        </div>
      </template>
    </Switcher>
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
