<script setup lang="ts">
import { cross, search, tick } from '@/assets/icons/actions';
import { arrowDown, directToOtherPage } from '@/assets/icons/arrows';
import { Alert, Button, Checkbox, DropDown, Input, RadioButton, Switcher, Tabs, Tooltip } from '@/components/ui';
import { useLoaderStore } from '@/store/loadingState';

const dropdownValue = ref<number>();
const dropdownOptions = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `option ${i + 1}` }));

const loaderStore = useLoaderStore();
const { $toast } = useNuxtApp();

const togglePrefix = ref(true);
const toggleSuffix = ref(true);
const toggleInvalid = ref(false);
const inputStringVal = ref('');
const inputNumberVal = ref<number>(0);

const searchQuery = ref('');
const complexSelected = ref<number>(0);

const check = ref(false);

const checkGroup = ref<number[]>([]);
const checkGroupOptions = Array.from({ length: 4 }, (_, i) => ({ id: i + 1, name: `label ${i + 1}` }));

const radioValue = ref<number>();

const switchVal = ref(false);

const complexDropdownList = computed(() => {
  if (!searchQuery.value) return [];
  return Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `${searchQuery.value}-${i + 1}` }));
});

const tabsList = ['Dropdowns', 'Inputs', 'Checkboxes', 'Tooltips'];
const tabModel = ref('');
const transitionName = ref('slide-in-left');

watch(() => tabModel.value, (newValue, oldValue) => {
  if (!oldValue) return;
  const currentIndex = tabsList.findIndex(item => item === oldValue);
  const newIndex = tabsList.findIndex(item => item === newValue);
  transitionName.value = currentIndex > 0 && newIndex < currentIndex ? 'slide-in-left' : 'slide-in-right';
});
</script>

<template>
  <div class="wrapper">
    <div class="flex-col gap">
      <div>
        <Tabs
          v-model="tabModel"
          :items="tabsList"
          size="l"
          :loading="loaderStore.isLoading"
        />
      </div>
    </div>

    <div class="animated-group">
      <transition-group :name="transitionName">
        <div v-if="tabModel === 'Dropdowns'" class="components">
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
        <div v-if="tabModel === 'Inputs'" class="components">
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
        <div v-if="tabModel === 'Checkboxes'" class="components">
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
        <div v-if="tabModel === 'Tooltips'" class="components">
          <h2>Tooltips</h2>
          <div class="flex items-center gap">
            <Tooltip text="Top tooltip" position="top">
              <Button severity="secondary" label="top" size="s" />
            </Tooltip>
            <Tooltip text="Bottom tooltip" position="bottom">
              <Button severity="secondary" label="bottom" size="s" />
            </Tooltip>
            <Tooltip text="Left tooltip" position="left">
              <Button severity="secondary" label="left" size="s" />
            </Tooltip>
            <Tooltip text="Right tooltip" position="right">
              <Button severity="secondary" label="right" size="s" />
            </Tooltip>

            <Tooltip background="primary-variant" position="top">
              <Button label="Custom tooltip" size="s" />
              <template #content>
                <div class="flex-col gap">
                  <div class="font-24-m">
                    Some Text
                  </div>
                  <Button
                    severity="secondary"
                    type="nuxt-link"
                    label="Go to main"
                    no-hover-bg
                    to="/"
                    :icon-right="directToOtherPage"
                    size="s"
                    padding="1rem"
                  />
                </div>
              </template>
            </Tooltip>
          </div>
          <h2 class="w-full">
            Alerts
          </h2>
          <Alert type="success" title="Title text" description="Description text" no-icon />
          <Alert type="attention" title="Title text" description="Description text" />
          <Alert title="Title text" description="Description text" />

          <Alert type="success" description="No title" />
          <Alert type="attention" description="No title" />
          <Alert title="Title text" description="No title" :close-timeout="5" />

          <h2 class="w-full">
            Toasts
          </h2>
          <Button label="Toast success" @click="$toast.success('Toast success text')" />
          <Button label="Toast attention" @click="$toast.attention('Toast attention text ')" />
          <Button label="Toast error" @click="$toast.error('Toast error text')" />
        </div>
      </transition-group>
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

.animated-group {
  position: relative;
  [class*='leave-active'] {
    position: absolute;
  }
}

h2, hr {
  width: 100%;
}
</style>
