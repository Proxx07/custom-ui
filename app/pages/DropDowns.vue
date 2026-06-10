<script setup lang="ts">
import { cross, tick } from '@/assets/icons/actions';
import { arrowDown } from '@/assets/icons/arrows';
import { Button, DropDown, Input } from '@/components/ui';
import { useLoaderStore } from '@/store/loadingState';

const dropdownValue = ref<number>();
const dropdownOptions = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `option ${i + 1}` }));

const loaderStore = useLoaderStore();
</script>

<template>
  <div class="wrapper">
    <div class="components">
      <h2>DropDowns:</h2>

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
        <template #target="{ selected, open, isOpened, loading }">
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
            @click="open"
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
        <template #target="{ selected, open, isOpened, downIcon, loading }">
          <Button
            :label="selected?.name ?? 'Custom dd'"
            severity="destructive"
            size="s"
            :loading="loading"
            :icon-left="downIcon"
            :rotate-left-icon="isOpened"
            @click="open"
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

    <div class="components">
      <h2>Inputs: </h2>
      <Input placeholder="Placeholder" size="xl" />
      <Input placeholder="Placeholder" size="l" />
      <Input placeholder="Placeholder" />
      <Input placeholder="Placeholder" size="s" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: grid;
  gap: 2rem;
  align-content: flex-start;
}
.components {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: flex-start;
  h2, hr {
    width: 100%;
  }
}
</style>
