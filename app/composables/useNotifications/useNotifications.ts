import type { INotification, NotificationsResponse } from './types';

export const useNotifications = () => {
  const { $request } = useNuxtApp();
  const { locale } = useI18n();

  const loading = ref(false);
  const nextCursor = ref('');
  const list = shallowRef<INotification[]>([]);

  const hasMore = computed(() => !!nextCursor.value);

  const notificationsFetchRequest = async () => {
    const { data } = await $request<NotificationsResponse>('/api/v2/notifications', {
      query: {
        lang: locale.value,
        cursor: nextCursor.value,
      },
    });

    nextCursor.value = data?.next_cursor || '';

    return data?.items || [];
  };

  const fetchNotifications = async () => {
    if (loading.value) return;
    loading.value = true;
    const items = await notificationsFetchRequest();
    loading.value = false;
    if (items.length) list.value = items;
  };

  const loadMoreNotifications = async ([entry]: IntersectionObserverEntry[]) => {
    if (loading.value || !hasMore.value || !entry?.isIntersecting) return;
    loading.value = true;
    const items = await notificationsFetchRequest();
    loading.value = false;

    if (items.length) list.value = [...list.value, ...items];
  };

  return {
    list,
    loading,
    hasMore,
    fetchNotifications,
    loadMoreNotifications,
  };
};
