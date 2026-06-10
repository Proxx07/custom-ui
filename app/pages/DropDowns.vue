<script setup lang="ts">
import { cross, search, tick } from '@/assets/icons/actions';
import { arrowDown } from '@/assets/icons/arrows';
import { Button, Checkbox, DropDown, Input } from '@/components/ui';
import { useLoaderStore } from '@/store/loadingState';

const dropdownValue = ref<number>();
const dropdownOptions = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `option ${i + 1}` }));

const loaderStore = useLoaderStore();

const togglePrefix = ref(true);
const toggleSuffix = ref(true);
const toggleInvalid = ref(false);
const inputStringVal = ref('');
const inputNumberVal = ref<number>(0);

const searchQuery = ref('');
const complexSelected = ref<number>(0);

const check = ref(false);

const complexDropdownList = computed(() => {
  if (!searchQuery.value) return [];
  return Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `${searchQuery.value}-${i + 1}` }));
});
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
    <hr>
    <div class="components">
      <h2>Inputs: </h2>
      <Input v-model="inputStringVal" :loading="loaderStore.isLoading" placeholder="Size xl" size="xl" />
      <Input v-model="inputStringVal" :loading="loaderStore.isLoading" placeholder="Size l" size="l" />
      <Input v-model="inputStringVal" :loading="loaderStore.isLoading" placeholder="Size m" />
      <Input v-model="inputStringVal" :loading="loaderStore.isLoading" placeholder="Size s" size="s" />

      <br>
      <Input v-model="inputNumberVal" type="number" placeholder="Number" :loading="loaderStore.isLoading" />
    </div>

    <div class="components">
      <Input v-model="inputStringVal" :loading="loaderStore.isLoading" label="Label xl" size="xl" />
      <Input v-model="inputStringVal" :loading="loaderStore.isLoading" label="Label l" size="l" />
      <Input v-model="inputStringVal" :loading="loaderStore.isLoading" label="Label m" />
      <Input v-model="inputStringVal" :loading="loaderStore.isLoading" label="Label s" size="s" />
    </div>
    <hr>
    <div class="components">
      <Checkbox v-model="togglePrefix" label="togglePrefix" />

      <Input v-model="inputStringVal" :loading="loaderStore.isLoading" label="Slots label placeholder" placeholder="Placeholder">
        <template v-if="togglePrefix" #prefix>
          prefix
        </template>
        <template #suffix>
          suffix
        </template>
      </Input>
    </div>
    <hr>
    <div class="components">
      <Checkbox v-model="toggleSuffix" label="toggleSuffix" />
      <Checkbox v-model="toggleInvalid" label="toggleInvalid" />

      <Input
        v-model="inputStringVal"
        :loading="loaderStore.isLoading"
        label="All and invalid"
        placeholder="Placeholder"
        size="s"
        :hint="toggleInvalid && 'Additional message'"
        :invalid="toggleInvalid"
      >
        <template v-if="togglePrefix" #prefix>
          prefix
        </template>
        <template v-if="toggleSuffix" #suffix>
          suffix
        </template>
      </Input>
    </div>
    <hr>
    <div class="components">
      <DropDown
        v-model="complexSelected"
        :items="complexDropdownList"
        value="id"
        item-label="name"
      >
        <template #target="{ openDropDown, closeDropDown, loading: isInputLoading }">
          <Input
            v-model="searchQuery"
            :loading="loaderStore.isLoading"
            label="Complex input"
            placeholder="Placeholder"
            hint="Write smth for autocomplete"
            :invalid="toggleInvalid"
            @focus="openDropDown"
            @blur="closeDropDown"
          >
            <template #prefix>
              <Button
                :icon-left="search"
                variant="text"
                :loading="isInputLoading"
                severity="secondary"
              />
            </template>
            <template #suffix>
              <DropDown
                v-model="dropdownValue"
                :items="dropdownOptions"
                :loading="loaderStore.isLoading"
                label="Small"
                size="s"
                value="id"
                item-label="name"
              >
                <template #target="{ selected, toggleDropDown, isOpened, loading, downIcon }">
                  <Button
                    :label="selected ? selected.name : 'DropDown'"
                    severity="attention"
                    variant="text"
                    padding="1rem"
                    :loading="loading"
                    :icon-right="downIcon"
                    :rotate-right-icon="isOpened"
                    @click="toggleDropDown"
                  />
                </template>
              </DropDown>
            </template>
          </Input>
        </template>
      </DropDown>
    </div>
    <hr>
    <div class="components">
      <h2>Checkboxes</h2>
      <Checkbox v-model="check" label="Checkbox label" />
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
}
h2, hr {
  width: 100%;
}
</style>
