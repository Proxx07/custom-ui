<script setup lang="ts">
import { directToOtherPage } from '@/assets/icons/arrows';
import { cash } from '@/assets/icons/crypro';
import { clock } from '@/assets/icons/general';
import { VIcon } from '@/components/ui';
import {
  type INotification,
  NOTIFICATION_ACTION_ICONS,
  NOTIFICATION_PARAMS_STATUS, NOTIFICATION_STATUS_ICONS,
} from '@/composables/useNotifications';
import { checkIsSouvenir, checkIsStatTrack, getExteriorFromName, parseSkinName } from '@/composables/useSkinItem';
import { useCurrenciesStore } from '@/store/currencyStore';
import { getMonthDayYearDateFromDateString, getTimeStringFromDateString } from '@/utils/timeFormatters';
import NotificationSkin from './NotificationSkin.vue';

const props = defineProps<{
  notification: INotification
}>();

const { t } = useI18n({ useScope: 'parent' });
const currencyStore = useCurrenciesStore();

const isSkin = props.notification.image && props.notification.image.startsWith('http');

const icon = NOTIFICATION_ACTION_ICONS[props.notification.action] !== 'currency'
  ? NOTIFICATION_ACTION_ICONS[props.notification.action]
  : cash;

const NotificationTitleTag = h(`${props.notification.link ? 'a' : 'div'}`, {
  class: 'font-16-m flex items-center',
  ...(props.notification.link && {
    href: props.notification.link,
    target: '_blank',
  }),
});

const messageIsNaN = Number.isNaN(Number.parseFloat(props.notification.message));
const exterior = messageIsNaN ? getExteriorFromName(props.notification.message) || '' : '';
const { type = '', name = '' } = messageIsNaN ? parseSkinName(props.notification.message) : { name: '', type: '' };
const typeColorCls = checkIsStatTrack(type) ? 'color-stattrak' : checkIsSouvenir(type) ? 'color-souvenir' : 'color-on-surface-tertiary';
const sum = computed(() => !messageIsNaN ? currencyStore.priceToCurrency(currencyStore.calculatePrice(+props.notification.message)) : '');

const date = getMonthDayYearDateFromDateString(props.notification.created);
const time = getTimeStringFromDateString(props.notification.created);

const status = NOTIFICATION_PARAMS_STATUS[props.notification.parameter];
</script>

<template>
  <div class="notification">
    <VIcon
      span-bg="surface-container"
      :size="22"
      :icon="icon"
      class="icon flex-center"
    />

    <NotificationTitleTag>
      {{ t(notification.action) }}
      <VIcon v-if="props.notification.link" :icon="directToOtherPage" :size="22" />
    </NotificationTitleTag>

    <div class="empty" />

    <NotificationSkin
      v-if="isSkin"
      :image="notification.image!"
      :type-color-cls="typeColorCls"
      :exterior="exterior"
      :name="name"
      :type="type"
    />

    <div v-else class="font-14-m color-on-surface-secondary capitalize-first-letter">
      {{ sum || name }}
    </div>

    <div class="notification__footer">
      <div class="flex items-center color-on-surface-secondary gap-1">
        <VIcon :icon="clock" :size="12" /> {{ date }}
        <span class="color-on-surface-tertiary"> {{ time }} </span>
      </div>

      <div class="ml-auto flex items-center gap-1" :class="[`color-${status}`]">
        <VIcon :icon="NOTIFICATION_STATUS_ICONS[status]" :size="18" style="margin-top: -2px" />
        {{ t(notification.parameter) }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notification {
  width: 100%;
  display: grid;
  grid-template-columns: 16% 1fr;
  gap: 1rem 1.6rem;
  align-items: center;
  background: var(--surface-high-container);
  border-radius: var(--radius-l);
  padding: 1rem 1.6rem .8rem;

  &__footer {
    grid-column: span 2;
    padding-top: .4rem;
    margin-top: .4rem;
    font: var(--font-12-m);
    display: flex;
    align-items: center;
  }
}
.gap-1 { gap: 4px };
.spoiler {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.icon {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
}
</style>
