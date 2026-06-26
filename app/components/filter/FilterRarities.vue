<script setup lang="ts">
import { Button, Checkbox } from '@/components/ui';
import { type IRarity, RaritiesQueryMap } from '@/composables/useItemRarities';

const props = defineProps<{
  modelValue: string[]
  raritiesList: IRarity[]

  additionalRarities?: Array<{
    title: string
    list: IRarity[]
  }>
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>();

const { t } = useI18n();

const showMore = ref(false);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value: string[]) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <div class="flex-col gap">
    <Checkbox
      v-for="rarity in raritiesList"
      :key="rarity.value"
      v-model="model"
      :value="RaritiesQueryMap[rarity.value]"
      fluid
    >
      <template #default="{ isHovered, updateOnlyCurrent }">
        <div class="label-wrapper">
          <span class="dot" :style="{ background: rarity.color }" />

          <div style="padding: .4rem 0 .3rem;">
            {{ t(`rarities.${rarity.value}`) }}
          </div>

          <transition name="fade">
            <Button
              v-if="isHovered"
              variant="outlined"
              severity="secondary"
              label="ONLY"
              size="s"
              padding=".2rem .4rem"
              class="only-button"
              @click="updateOnlyCurrent"
            />
          </transition>
        </div>
      </template>
    </Checkbox>

    <template v-if="additionalRarities?.length && showMore">
      <template
        v-for="additional in additionalRarities"
        :key="additional.title"
      >
        <div class="font-18-m my-12">
          {{ additional.title }}
        </div>

        <Checkbox
          v-for="rarity in additional.list"
          :key="rarity.value"
          v-model="model"
          :value="RaritiesQueryMap[rarity.value]"
          fluid
        >
          <template #default="{ isHovered, updateOnlyCurrent }">
            <div class="label-wrapper">
              <span class="dot" :style="{ background: rarity.color }" />

              <div style="padding: .4rem 0 .3rem;">
                {{ t(`rarities.${rarity.value}`) }}
              </div>

              <transition name="fade">
                <Button
                  v-if="isHovered"
                  variant="outlined"
                  severity="secondary"
                  label="ONLY"
                  size="s"
                  padding=".2rem .4rem"
                  class="only-button"
                  @click="updateOnlyCurrent"
                />
              </transition>
            </div>
          </template>
        </Checkbox>
      </template>
    </template>

    <Button
      v-if="additionalRarities?.length"
      :label="showMore ? 'Show less' : 'Show more'"
      severity="tretiary"
      size="s"
      class="justify-center my-12"
      @click="showMore = !showMore"
    />
  </div>
</template>

<style scoped lang="scss">
.label-wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
}

.only-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.my-12 {
  margin: 1.2rem 0;
}

.dot {
  width: 8px;
  height: 8px;
  font-size: 0;
  border-radius: 50%;
  margin-right: 8px;
}
</style>
