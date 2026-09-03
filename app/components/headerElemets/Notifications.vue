<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components';
import { bell } from '@/assets/icons/actions';
import { NotificationItem } from '@/components/notification';
import { Button, type ButtonExpose, DotLoader, Modal, Popover } from '@/components/ui';
import { useResponsive } from '@/composables/UI';
import { useNotifications } from '@/composables/useNotifications';

const {
  list, hasMore, loading,
  fetchNotifications, loadMoreNotifications,
} = useNotifications();

onMounted(fetchNotifications);

const { isMax } = useResponsive();
const target = ref<ButtonExpose>();
const [opened, toggle] = useToggle();
</script>

<template>
  <div>
    <Button ref="target" severity="tertiary" variant="outlined" size="s" :icon-right="bell" @click="toggle()" />

    <client-only>
      <Modal
        v-if="isMax('mobile')"
        v-model="opened"
        title="Notifications"
      >
        <template #content>
          <div class="flex-col justify-center items-center gap" style="min-height: 150px">
            <DotLoader v-if="!list.length && loading" :count="5" />
            <div v-if="!list.length && !loading" class="font-32-sb">
              ¯\_(ツ)_/¯
            </div>
            <NotificationItem
              v-for="item in list"
              :key="item.id"
              :notification="item"
            />
            <DotLoader v-if="hasMore" v-intersection-observer="loadMoreNotifications" :count="5" />
          </div>
        </template>
      </Modal>
      <Popover v-else v-model="opened" :target="target?.buttonRef" stay-on-scroll :width="350" bg="surface-container">
        <div class="flex-col justify-center items-center gap" style="min-height: 150px">
          <DotLoader v-if="!list.length && loading" :count="5" />
          <div v-if="!list.length && !loading" class="font-32-sb">
            ¯\_(ツ)_/¯
          </div>
          <NotificationItem
            v-for="item in list"
            :key="item.id"
            :notification="item"
          />
          <DotLoader v-if="hasMore" v-intersection-observer="loadMoreNotifications" :count="5" />
        </div>
      </Popover>
    </client-only>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "deposit_funds": "Deposit funds",
    "gift_withdraw": "Gift withdraw",
    "giveaway_create": "Giveaway create",
    "giveaway_refund": "Giveaway refund",
    "giveaway_win": "Giveaway win",
    "sending_steam": "Sending steam",
    "withdraw_funds": "Withdraw funds",
    "withdrawing_steam": "Withdrawing steam",

    "accepted_trade": "Accepted trade",
    "buying": "Buying",
    "canceled": "Canceled",
    "completed": "Completed",
    "created": "Created",
    "declined": "Declined",
    "declined_trade": "Declined trade",
    "error": "Error",
    "paid": "Paid",
    "pending": "Pending",
    "processing": "Processing",
    "selling": "Selling",
    "sending": "Sending",
    "sent_trade": "Sent trade",
    "sent_trade_to_you": "Sent trade to you",
    "waiting_conf": "Waiting confirmation",
    "waiting_mobile": "Waiting mobile"
  },
  "ru": {
    "deposit_funds": "Пополнить средства",
    "gift_withdraw": "Вывод подарка",
    "giveaway_create": "Создание розыгрыша",
    "giveaway_refund": "Возврат розыгрыша",
    "giveaway_win": "Выигрыш в розыгрыше",
    "sending_steam": "Отправка в Steam",
    "withdraw_funds": "Вывод средств",
    "withdrawing_steam": "Вывод из Steam",

    "accepted_trade": "Обмен принят",
    "buying": "Покупка",
    "canceled": "Отменено",
    "completed": "Завершено",
    "created": "Создано",
    "declined": "Отклонено",
    "declined_trade": "Обмен отклонен",
    "error": "Ошибка",
    "paid": "Оплачено",
    "pending": "В ожидании",
    "processing": "Обработка",
    "selling": "Продажа",
    "sending": "Отправка",
    "sent_trade": "Обмен отправлен",
    "sent_trade_to_you": "Обмен отправлен вам",
    "waiting_conf": "Ожидание подтверждения",
    "waiting_mobile": "Ожидание моб. подтверждения"
  }
}
</i18n>
