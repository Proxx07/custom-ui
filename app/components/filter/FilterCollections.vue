<script setup lang="ts">
import { computed } from 'vue';
import { cross, search } from '@/assets/icons/actions';
import { DropDown, Input, ListItem, VIcon } from '@/components/ui';
import { useCollections } from '@/composables/useCollections';

const props = defineProps<{
  modelValue: string
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const { list, loading, fetchCollections } = useCollections();

const model = computed({
  get() {
    return props.modelValue;
  },

  set(value: string) {
    emit('update:modelValue', value);
  },
});

const searchQuery = ref('');

const searchMatchedItems = computed(() => {
  return list.value.filter(({ collection }) => collection.toLowerCase().includes(searchQuery.value));
});

onMounted(fetchCollections);
</script>

<template>
  <DropDown
    v-model="model"
    :items="searchMatchedItems"
    :loading="loading"
    value="collection"
    item-label="collection"
    size="s"
  >
    <template #targetInner="{ selected }">
      <ListItem
        v-memo="[model, loading]"
        :label="selected?.collection ?? 'Select collection'"
        :left-slot-size="24"
        :right-slot-size="20"
        text-spoiler
        class="font-16-n"
      >
        <template v-if="selected" #prepend>
          <img
            v-if="selected"
            :src="selected?.collection_icon"
            :alt="selected?.collection"
          >
        </template>
        <template v-if="selected" #append>
          <VIcon :icon="cross" color="error" @click.stop.prevent="model = ''" />
        </template>
      </ListItem>
    </template>

    <template #itemInner="{ item }">
      <ListItem
        :label="item.collection"
        :left-slot-size="24"
        text-spoiler
        class="font-16-n"
      >
        <template v-if="item" #prepend>
          <img
            v-if="item"
            :src="item?.collection_icon"
            :alt="item?.collection"
          >
        </template>
      </ListItem>
    </template>

    <template #contentPrepend>
      <Input v-model="searchQuery" size="s" placeholder="Search by name">
        <template #prefix>
          <VIcon :icon="search" :size="18" style="margin-left: 1.2rem" />
        </template>
      </Input>
    </template>
  </DropDown>
</template>

<style scoped lang="scss"></style>
