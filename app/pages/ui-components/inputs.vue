<script setup lang="ts">
import { search } from '@/assets/icons/actions';
import {
  Button,
  Checkbox,
  DropDown, type DropDownExposes,
  Input,
} from '@/components/ui';
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

const complexDropDown = ref<DropDownExposes>();

const complexDropdownList = computed(() => {
  if (!searchQuery.value) return [];
  return Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `${searchQuery.value}-${i + 1}` }));
});

const handleComplexDropdownUpdate = () => {
  complexDropDown.value?.openDropDown();
};

const debouncedHandler = useDebounceFn(handleComplexDropdownUpdate, 200);
</script>

<template>
  <div class="components">
    <h2>Inputs: </h2>
    <Input v-model="inputStringVal" :loading="loaderStore.isLoading" placeholder="Size xl" size="xl" />
    <Input v-model="inputStringVal" :loading="loaderStore.isLoading" placeholder="Size l" size="l" />
    <Input v-model="inputStringVal" :loading="loaderStore.isLoading" placeholder="Size m" />
    <Input v-model="inputStringVal" :loading="loaderStore.isLoading" placeholder="Size s" size="s" />
    <br>
    <Input v-model="inputNumberVal" type="number" placeholder="Number" :loading="loaderStore.isLoading" />
    <hr>
    <Input v-model="inputStringVal" :loading="loaderStore.isLoading" label="Label xl" size="xl" />
    <Input v-model="inputStringVal" :loading="loaderStore.isLoading" label="Label l" size="l" />
    <Input v-model="inputStringVal" :loading="loaderStore.isLoading" label="Label m" />
    <Input v-model="inputStringVal" :loading="loaderStore.isLoading" label="Label s" size="s" />

    <hr>
    <Checkbox v-model="togglePrefix" label="togglePrefix" />

    <Input v-model="inputStringVal" :loading="loaderStore.isLoading" label="Slots label placeholder" placeholder="Placeholder">
      <template v-if="togglePrefix" #prefix>
        prefix
      </template>
      <template #suffix>
        suffix
      </template>
    </Input>

    <hr>
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
    <hr>
    <DropDown
      ref="complexDropDown"
      v-model="complexSelected"
      :items="complexDropdownList"
      value="id"
      item-label="name"
    >
      <template #target="{ closeDropDown, loading: isInputLoading }">
        <Input
          v-model="searchQuery"
          :loading="loaderStore.isLoading"
          label="Complex input"
          placeholder="Placeholder"
          hint="Write smth for autocomplete"
          :invalid="toggleInvalid"
          @update:model-value="debouncedHandler"
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
