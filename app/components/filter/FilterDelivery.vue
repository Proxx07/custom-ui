<script setup lang="ts">
import { questionCircle } from '@/assets/icons/general';
import { Checkbox, ListItem, Tooltip, VIcon } from '@/components/ui';
import { DELIVERY_TIME_LIST, DELIVERY_TIME_RECORD, type DeliveryTimeTypes } from '@/composables/useDeliveryTime';

const props = defineProps<{
  modelValue: DeliveryTimeTypes[]
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: DeliveryTimeTypes[]): void
}>();

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value: DeliveryTimeTypes[]) {
    emit('update:modelValue', value);
  },
});

const { t } = useI18n();
</script>

<template>
  <div class="flex-col gap">
    <Checkbox
      v-for="deliveryTime in DELIVERY_TIME_LIST"
      :key="deliveryTime"
      v-model="model"
      :value="deliveryTime"
      fluid
    >
      <template #default>
        <ListItem
          :label="t(DELIVERY_TIME_RECORD[deliveryTime].name)"
          :left-slot-size="24"
          :right-slot-size="140"
          :gap="4"
        >
          <template #prepend>
            <VIcon
              :icon="DELIVERY_TIME_RECORD[deliveryTime].icon"
              color="on-surface-tertiary"
              :size="24"
            />
          </template>
          <template v-if="deliveryTime === '12h'" #append>
            <Tooltip
              text="The buyer can cancel the trade for free if the seller does not deliver the item within 30 minutes"
              position="bottom"
              class="ml-auto"
              :max-width="200"
            >
              <div class="cancellation">
                <VIcon :icon="questionCircle" />
                Free cancellation
              </div>
            </Tooltip>
          </template>
        </ListItem>
      </template>
    </Checkbox>
  </div>
</template>

<style scoped lang="scss">
.cancellation {
  background: var(--outline);
  font: var(--font-14-n);
  color: var(--on-surface-tertiary);
  cursor: pointer;
  padding: .3rem .5rem;
  border-radius: var(--radius-sm);
  display: flex;
  gap: .5rem;
}
</style>
