<script setup lang="ts">
import {Button, DropDown} from "~/components/ui";
import {arrowDown} from "~/assets/icons/arrows";

const dropdownValue = ref();
const dropdownOptions = Array.from({ length: 20 }, (_, i) => ({id: i+1, name: `option ${i+1}`}));
</script>

<template>
  <div class="wrapper">
    <DropDown
      v-model="dropdownValue"
      :items="dropdownOptions"
      label="Select options"
      value="id"
      item-label="name"
      hide-down-icon
      toggle-on-hover
    />

    <DropDown
      v-model="dropdownValue"
      :items="dropdownOptions"
      label="Select options"
      value="id"
      item-label="name"
    >
      <template #target="{selected, open, isOpened}">
        <Button
          :label="selected?.name ?? 'Open'"
          severity="tretiary"
          variant="text"
          size="s"
          no-hover-bg
          :icon-right="arrowDown"
          :rotate-right-icon="isOpened"
          @click="open"
        />
      </template>
    </DropDown>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 2rem;
}
</style>