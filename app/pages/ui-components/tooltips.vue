<script setup lang="ts">
import type { TColors } from '@/utils';
import { directToOtherPage } from '@/assets/icons/arrows';
import { phase } from '@/assets/icons/general';
import {
  Alert,
  Button,
  PhaseLabel,
  Tooltip,
  VIcon,
} from '@/components/ui';

const { $toast } = useNuxtApp();

const phaseList: TColors[] = ['pearl', 'sapphire', 'ruby', 'emerald'];
</script>

<template>
  <div class="components">
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

    <h2 class="w-full">
      Phase labels
    </h2>

    <PhaseLabel size="s" label="Phase" />
    <PhaseLabel size="s" label="Phase sapphire" phase="sapphire" />
    <PhaseLabel size="s" label="Phase emerald" phase="emerald" />
    <PhaseLabel size="s" label="Phase pearl" phase="pearl" />
    <PhaseLabel size="s" label="Phase ruby" phase="ruby" />
    <hr>
    <PhaseLabel label="Phase" />
    <PhaseLabel label="Phase sapphire" phase="sapphire" />
    <PhaseLabel label="Phase emerald" phase="emerald" />
    <PhaseLabel label="Phase pearl" phase="pearl" />
    <PhaseLabel label="Phase ruby" phase="ruby" />
    <hr>
    <PhaseLabel size="l" label="Phase" />
    <PhaseLabel size="l" label="Phase sapphire" phase="sapphire" />
    <PhaseLabel size="l" label="Phase emerald" phase="emerald" />
    <PhaseLabel size="l" label="Phase pearl" phase="pearl" />
    <PhaseLabel size="l" label="Phase ruby" phase="ruby" />

    <Tooltip
      v-for="phaseName in phaseList"
      :key="phaseName"
      :background="phaseName"
      position="bottom"
    >
      <div
        class="cursor-pointer"
        :class="[`color-${phaseName}`]"
      >
        <VIcon :icon="phase" />
      </div>
      <template #content>
        {{ phaseName }}
      </template>
    </Tooltip>
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
