import type { ISearchItem } from './types';
import type { gameTypes } from '@/composables/useGames';
import type { ISkin } from '@/composables/useSkinItem';
import { setSkinSearchItemToSkinItem } from './model';

export const useSkinsSearch = () => {
  const { locale } = useI18n();
  const { $request } = useNuxtApp();
  const loading = ref<boolean>(false);
  const searchQuery = ref<string>('');
  const list = shallowRef<ISkin[]>([]);

  const fetchSearchList = async (game: gameTypes) => {
    if (loading.value || !searchQuery.value) return;
    list.value = [];
    loading.value = true;
    const { data }
      = await $request<{ data: ISearchItem[] }>('/api/search-names', {
        query: {
          game,
          search: searchQuery.value,
          lang: locale.value,
        },
      });

    list.value = !data?.data
      ? []
      : data.data
        .map(item => setSkinSearchItemToSkinItem(item, game))
        .filter(item => item.image);
    // .sort((a, b) => b.offersCount - a.offersCount);
    loading.value = false;
  };

  return {
    list,
    loading,
    searchQuery,
    fetchSearchList,
  };
};
