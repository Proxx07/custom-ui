<script setup lang="ts">
import { wallet } from '@/assets/icons/features';
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
        {{ walletPrice }} | {{ holdPrice }}
      </Modal>
      <Popover
        v-else
        v-model="opened"
        :target="target?.buttonRef"
        :width="350"
      >
        {{ walletPrice }} | {{ holdPrice }}
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
</style>
