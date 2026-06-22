<script setup lang="ts">
import { cross, grid2x, grid3x, grid3x3, tick } from '@/assets/icons/actions';
import { arrowDown } from '@/assets/icons/arrows';
import {
  Button,
  ButtonGroup,
  DropDown, VIcon,
} from '@/components/ui';
import { useLoaderStore } from '@/store/loadingState';

const dropdownValue = ref<number>();
const dropdownOptions = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `option ${i + 1}` }));

const buttonGroupItems = ['Label 1', 'Label 2', 'Label 3', 'Label 4'];
const buttonGroupItems2 = [
  {
    label: grid2x,
    value: 0,
  },
  {
    label: grid3x,
    value: 1,
  },
  {
    label: grid3x3,
    value: 2,
  },
];
const selectedButton = ref<string>('');
const selectedButton2 = ref<number>(0);
const loaderStore = useLoaderStore();
</script>

<template>
  <div class="components">
    <h2>DropDowns:</h2>
    <ButtonGroup
      v-model="selectedButton"
      :items="buttonGroupItems"
    />
    <hr>
    <ButtonGroup
      v-model="selectedButton2"
      :items="buttonGroupItems2"
      value="value"
    >
      <template #itemInner="{ item }">
        <VIcon :icon="item.label" :size="18" />
      </template>
    </ButtonGroup>
    <DropDown
      v-model="dropdownValue"
      :items="dropdownOptions"
      :loading="loaderStore.isLoading"
      label="Large xl"
      size="xl"
      value="id"
      item-label="name"
    />

    <DropDown
      v-model="dropdownValue"
      :items="dropdownOptions"
      :loading="loaderStore.isLoading"
      label="Large"
      size="l"
      value="id"
      item-label="name"
    />

    <DropDown
      v-model="dropdownValue"
      :items="dropdownOptions"
      :loading="loaderStore.isLoading"
      label="Default"
      value="id"
      item-label="name"
    />

    <DropDown
      v-model="dropdownValue"
      :items="dropdownOptions"
      :loading="loaderStore.isLoading"
      label="Small"
      size="s"
      value="id"
      item-label="name"
    />
    <hr>
    <DropDown
      v-model="dropdownValue"
      :items="dropdownOptions"
      :loading="loaderStore.isLoading"
      label="Hover toggle"
      value="id"
      item-label="name"
      toggle-on-hover
    />

    <DropDown
      v-model="dropdownValue"
      :items="dropdownOptions"
      :loading="loaderStore.isLoading"
      value="id"
      item-label="name"
    >
      <template #target="{ selected, toggleDropDown, isOpened, loading }">
        <Button
          :label="selected?.name ?? 'Custom dd'"
          severity="tretiary"
          variant="text"
          hover-text-color="primary-variant"
          size="s"
          no-hover-bg
          :loading="loading"
          :icon-right="arrowDown"
          :rotate-right-icon="isOpened"
          @click="toggleDropDown"
        />
      </template>
    </DropDown>

    <DropDown
      v-model="dropdownValue"
      :items="dropdownOptions"
      :loading="loaderStore.isLoading"
      value="id"
      item-label="name"
    >
      <template #target="{ selected, toggleDropDown, isOpened, downIcon, loading }">
        <Button
          :label="selected?.name ?? 'Custom dd'"
          severity="destructive"
          size="s"
          :loading="loading"
          :icon-left="downIcon"
          :rotate-left-icon="isOpened"
          @click="toggleDropDown"
        />
      </template>

      <template #item="{ item, isSelected, selectItem }">
        <Button
          :icon-left="isSelected ? tick : cross"
          :label="item.name"
          :severity="isSelected ? 'secondary' : 'tretiary'"
          variant="text"
          :text-color="!isSelected ? 'on-surface-tretiary' : undefined"
          :hover-text-color="isSelected ? 'on-attention' : 'on-surface'"
          size="s"
          padding="10px"
          no-hover-bg
          @click="selectItem"
        />
      </template>
    </DropDown>
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
