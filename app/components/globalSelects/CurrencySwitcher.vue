<script setup lang="ts">
import { Button, DropDown } from '@/components/ui';
import { CURRENCIES, useCurrencies } from '@/composables/useCurrencies';

const { currency, selectedCurrency, setCurrentCurrency } = useCurrencies();
</script>

<template>
  <DropDown
    :model-value="currency"
    :items="CURRENCIES"
    size="s"
    value="code"
    @update:model-value="setCurrentCurrency"
  >
    <template #target="{ open, isOpened, downIcon }">
      <Button
        severity="tretiary"
        variant="text"
        no-hover-bg
        padding="1rem"
        :icon-right="downIcon"
        :rotate-right-icon="isOpened"
        label="dropdownValue"
        @click="open"
      >
        <span v-html="selectedCurrency?.symbol" />
        <span class="uppercase">
          {{ selectedCurrency?.code }}
        </span>
      </Button>
    </template>
    <template #itemInner="{ item }">
      <span v-html="item.symbol" />
      <span class="uppercase"> {{ item.code }} </span>
    </template>
  </DropDown>
</template>
