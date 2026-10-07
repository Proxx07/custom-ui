<script setup lang="ts">
import { h } from 'vue';
import { minus, plus } from '@/assets/icons/actions';
import { wallet } from '@/assets/icons/features';
import { clock } from '@/assets/icons/general';
import { Button, type ButtonExpose, Modal, Popover, VIcon } from '@/components/ui';
import { useResponsive } from '@/composables/UI';

const props = defineProps<{
  walletPrice: string
  holdPrice: string

  walletInteger: string
  walletFractional: string
}>();

const { isMax } = useResponsive();
const target = ref<ButtonExpose>();
const [opened, toggle] = useToggle();

const WalletHeader = () => h('div', { class: 'flex items-center gap w-full' },
  [
    h('div', { class: 'font-16-m' }, 'Balance'),
    h(Button, { severity: 'tertiary', variant: 'text', size: 's', class: 'ml-auto', iconLeft: clock }),
  ],
);

const BalanceCard = () => h('div', {},
  [
    h('div', { class: 'font-16-m' }, props.walletPrice),
    h(VIcon, { icon: wallet, size: 20, class: 'rowspan-2' }),
    h('div', { class: 'font-14-n' }, 'Available balance'),
  ],
);

const HoldInfo = () => h('div', { class: 'color-attention' }, `${props.holdPrice} on hold`);

const ButtonsWrapper = () => h('div', { }, [
  h(Button, {
    label: 'Deposit', severity: 'secondary', variant: 'ghost',
    size: 's', fluid: true, iconLeft: plus, class: 'justify-center',
  }),
  h(Button, {
    label: 'Withdraw', severity: 'tertiary', variant: 'outlined',
    size: 's', fluid: true, iconLeft: minus, class: 'justify-center',
  }),
]);
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
        <template #header-inner>
          <WalletHeader />
        </template>
        <template #content>
          <div class="wallet-wrapper">
            <BalanceCard class="available-balance" />
            <HoldInfo />
          </div>
        </template>
        <template #footer-inner>
          <ButtonsWrapper class="buttons-wrapper" />
        </template>
      </Modal>
      <Popover
        v-else
        v-model="opened"
        :target="target?.buttonRef"
        :width="300"
      >
        <div class="wallet-wrapper">
          <WalletHeader />
          <BalanceCard class="available-balance" />
          <HoldInfo />
          <ButtonsWrapper class="buttons-wrapper" />
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

.buttons-wrapper {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
}
</style>
