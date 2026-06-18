<script setup lang="ts">
import { Tabs } from '@/components/ui';
import { useLoaderStore } from '@/store/loadingState';
import { capitalizeFirstLetter } from '@/utils';

const loaderStore = useLoaderStore();
const tabsList = ['dropdowns', 'inputs', 'ranges', 'checkboxes', 'tooltips', 'modals'];
const $router = useRouter();
const localePath = useLocalePath();

const getRouteModel = () => {
  const modelArr = $router.currentRoute.value.fullPath.split('/');
  return modelArr[modelArr.length - 1];
};
const pageModel = ref('');

const tabModel = computed({
  get() {
    return getRouteModel();
  },
  set(value) {
    pageModel.value = value || '';
    navigateTo(localePath(`/ui-components/${value}`));
  },
});

const transitionName = ref('slide-in-left');
watch(() => pageModel.value, (newValue, oldValue) => {
  if (!oldValue) return;
  const currentIndex = tabsList.findIndex(item => item === oldValue);
  const newIndex = tabsList.findIndex(item => item === newValue);
  transitionName.value = currentIndex > 0 && newIndex < currentIndex ? 'slide-in-left' : 'slide-in-right';
});
</script>

<template>
  <div class="wrapper">
    <div class="w-full" style="overflow-x: auto">
      <Tabs
        v-model="tabModel"
        :items="tabsList"
        size="l"
        :loading="loaderStore.isLoading"
      >
        <template #itemInner="{ item }">
          {{ capitalizeFirstLetter(item) }}
        </template>
      </Tabs>
    </div>
    <div class="inner-page-wrapper">
      <NuxtPage
        :transition="{
          name: transitionName,
          mode: 'default',
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: grid;
  gap: 2rem;
  align-content: flex-start;
  padding-top: 2rem;
}

.inner-page-wrapper {
  position: relative;
  :deep([class*='leave-active']) {
    position: absolute;
    width: 100%;
  }
}
</style>
