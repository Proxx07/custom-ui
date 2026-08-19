<script setup lang="ts">
import type { IUser } from '@/composables/useUser';
import { cart } from '@/assets/icons/actions';
import { trophey } from '@/assets/icons/features';
import { Notifications, User, Wallet } from '@/components/headerElemets';
import { Button } from '@/components/ui';
import { useCurrenciesStore } from '@/store/currencyStore';

const props = defineProps<{
  user: IUser
}>();

const currencyStore = useCurrenciesStore();

const walletSum = computed(() => currencyStore.priceToCurrency(currencyStore.calculatePrice(props.user.wallet)));
const holdSum = computed(() => currencyStore.priceToCurrency(currencyStore.calculatePrice(props.user.total_hold_amount)));

const userWallet = computed(() => {
  const totalPrice = props.user.wallet + props.user.total_hold_amount;
  const [integer = '0', fractional = '00'] = currencyStore.priceToCurrency(currencyStore.calculateWallet(totalPrice)).split(',');
  return {
    integer,
    fractional,
  };
});
</script>

<template>
  <div class="profile-widget">
    <div style="min-height: 46px" class="flex-center">
      {TOP_UP}
    </div>

    <Button
      severity="tertiary"
      text-color="attention"
      hover-text-color="attention"
      variant="outlined"
      size="s"
      :icon-right="trophey"
    />

    <Notifications />

    <Wallet
      :hold-price="holdSum"
      :wallet-price="walletSum"
      :wallet-fractional="userWallet.fractional"
      :wallet-integer="userWallet.integer"
    />

    <User :user="user" />

    <Button :icon-right="cart" severity="tertiary" variant="outlined" size="s" />
  </div>
</template>

<style scoped lang="scss">
.profile-widget {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}
</style>
