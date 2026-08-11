<script setup lang="ts">
import type { gameTypes } from '@/composables/useGames';
import type { SortTypes } from '@/utils';
import { DropDown } from '@/components/ui';
import { getMobileFilterData } from '@/composables/useSkinsList';

const props = defineProps<{
  order: string
  sort: SortTypes

  game: gameTypes
  isCatalog: boolean
}>();

const emit = defineEmits<{
  (e: 'update:order', value: string): void
  (e: 'update:sort', value: SortTypes): void
}>();

const { t } = useI18n();

const selectedOptionLabel = computed(() => {
  return getMobileFilterData(props.game, Boolean(props.isCatalog)).find(({ order, sort }) => {
    return props.order === order && props.sort === sort;
  })?.label ?? '';
});

const mobileSortSelectModel = computed({
  get() {
    return {
      order: props.order,
      sort: props.sort,
      label: selectedOptionLabel.value,
    };
  },
  set(value: { order: string, sort: SortTypes }) {
    emit('update:order', value.order);
    emit('update:sort', value.sort);
  },
});
</script>

<template>
  <DropDown
    v-model="mobileSortSelectModel"
    :items="getMobileFilterData(game, isCatalog)"
    item-label="label"
  >
    <template #itemInner="{ item }">
      {{ t(`filter_labels.${item.label}`) }}
    </template>
    <template #targetInner="{ selected }">
      {{ t(`filter_labels.${selected?.label}`) }}
    </template>
  </DropDown>
</template>
