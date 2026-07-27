import type { CatalogSkinListResponse, SkinsListResponse } from './types';
import type { gameTypes } from '@/composables/useGames';
import type { CatalogSkinItem, ISkin } from '@/composables/useSkinItem';
import { addGameForSkin, mapCatalogItemToSkinItem } from './model';

export const useSkinsList = () => {
  const { $request } = useNuxtApp();

  const list = useState<ISkin[]>('skins-list', () => shallowRef([]));
  const loading = useState<boolean>('skins-loading', () => true);
  const nextCursor = useState<string>('cursor', () => '');

  const hasMore = computed(() => nextCursor.value);

  const { locale } = useI18n();
  const skinsFetchRequest = async (game: gameTypes, query?: Record<string, unknown>) => {
    const isCatalog = game === 'csgo' && (query?.brand || query?.category);
    const catalogPath = `${query?.brand || ''}/${query?.category || ''}`;

    const { data, error } = isCatalog
      ? await $request<CatalogSkinListResponse>(`/api/v2/${game}/catalog/${catalogPath}?limit=50&lang=${locale.value}`, { query })
      : await $request<SkinsListResponse>(`/api/${game}/browse?limit=50&lang=${locale.value}`, { query });

    const list = (!data?.items || error) ? [] : data.items;

    const skins = list.map((item) => {
      if (isCatalog) return mapCatalogItemToSkinItem((item as CatalogSkinItem), game);
      return !(item as ISkin).game ? addGameForSkin((item as ISkin), game) : item;
    }) as ISkin[];

    nextCursor.value = data?.nextCursor || '';
    return { skins, error };
  };

  const fetchSkins = async (game: gameTypes, query?: any) => {
    list.value = [];
    nextCursor.value = '';
    loading.value = true;
    const { skins } = await skinsFetchRequest(game, query);
    list.value = skins;
    loading.value = false;
  };

  const loadMoreSkins = async (game: gameTypes, query?: any) => {
    if (!nextCursor.value) return;
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
