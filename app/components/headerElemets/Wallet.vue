<script setup lang="ts">
import { wallet } from '@/assets/icons/features';
import { clock } from '@/assets/icons/general';
import { Button, type ButtonExpose, Modal, Popover, VIcon } from '@/components/ui';
import { useResponsive } from '@/composables/UI';

defineProps<{
  walletPrice: string
  holdPrice: string

  walletInteger: string
  walletFractional: string
}>();

const { isMax } = useResponsive();
const target = ref<ButtonExpose>();
const [opened, toggle] = useToggle();
</script>

<template>
  <div>
    <Button
      ref="target"
      severity="tertiary"
      variant="outlined"
      size="s"
      padding="8px 15px"
      @click="toggle()"
    >
      <VIcon :icon="wallet" :size="22" class="wallet-icon" />
      {{ walletInteger }} <sup> {{ walletFractional }} </sup>
    </Button>

    <client-only>
      <Modal v-if="isMax('mobile')" v-model="opened">
        <div class="wallet-wrapper">
          {{ walletInteger }} | {{ holdPrice }}
        </div>
      </Modal>
      <Popover
        v-else
        v-model="opened"
        :target="target?.buttonRef"
        :width="300"
      >
        <div class="wallet-wrapper">
          <div class="flex items-center gap">
            <div class="font-16-m">
              Balance
            </div>

            <Button
              severity="tertiary"
              variant="text"
              size="s"
              class="ml-auto"
              :icon-left="clock"
            />
          </div>

          <div class="available-balance">
            <div class="font-20-m">
              {{ walletPrice }}
            </div>
            <VIcon :icon="wallet" :size="20" class="rowspan-2" />

            <div class="font-14-n">
              Available balance
            </div>
          </div>

          <div class="color-attention">
            {{ holdPrice }} on hold
          </div>
        </div>
      </Popover>
    </client-only>
  </div>
</template>

<style scoped lang="scss">
sup {
  align-self: flex-start;
  line-height: 1.2;
  opacity: 0.6;
}
.wallet-icon {
  margin-right: .4rem;
}

.wallet-wrapper {
  padding: 0.8rem 0.8rem 1.6rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.available-balance {
  padding: 1.2rem;
  display: grid;
  gap: 0.6rem;
  grid-template-columns: 10fr 1fr;
  align-items: center;
  border-radius: var(--radius-l);
  background: var(--outline);
}
</style>
