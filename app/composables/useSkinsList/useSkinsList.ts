import type { SkinsListResponse } from './types';
import type { gameTypes } from '@/composables/useGames';
import type { ISkin } from '@/composables/useSkinItem';
import { addGameForSkin } from './model';

export const useSkinsList = () => {
  const { $request } = useNuxtApp();

  const list = useState<ISkin[]>('skins-list', () => shallowRef([]));
  const loading = useState<boolean>('skins-loading', () => true);
  const nextCursor = useState<string>('cursor', () => '');

  const hasMore = computed(() => nextCursor.value);

  const skinsFetchRequest = async (game: gameTypes, query?: any) => {
    const { data, error } = await $request<SkinsListResponse>(`/api/${game}/browse?limit=50`, { query });
    const skins = (!data?.items || error) ? [] : data.items.map(item => !item.game ? addGameForSkin(item, game) : item);
    nextCursor.value = data?.nextCursor || '';
    return { skins, error };
  };

  const fetchSkins = async (game: gameTypes, query?: any) => {
    list.value = [];
    loading.value = true;
    const { skins } = await skinsFetchRequest(game, query);
    list.value = skins;
    loading.value = false;
  };

  const loadMoreSkins = async (game: gameTypes, query?: any) => {
    loading.value = true;
    const { skins } = await skinsFetchRequest(game, { ...query, cursor: nextCursor.value });
    list.value = [...list.value, ...skins];
    loading.value = false;
  };

  return {
    list,
    loading,
    hasMore,
    fetchSkins,
    loadMoreSkins,
  };
};
