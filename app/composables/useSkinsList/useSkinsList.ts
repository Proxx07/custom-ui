import type {
  CatalogListingResponse,
  CatalogSkinItem,
  CatalogSkinListResponse,
  SkinListItem,
  SkinsListResponse,
} from './types';
import type { gameTypes } from '@/composables/useGames';
import type { ISkin } from '@/composables/useSkinItem';
import { mapCatalogItemForCard, mapSkinsListItemForCard } from './model';

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
      : query?.search
        ? await $request<CatalogListingResponse>(`/api/${game}/listings?limit=30&lang=${locale.value}`, { query: { ...query, name: query.search } })
        : await $request<SkinsListResponse>(`/api/${game}/browse?limit=50&lang=${locale.value}`, { query });

    const list = (error || !data)
      ? []
      : isCatalog
        ? (data as CatalogSkinListResponse).items
        : query?.search
          ? (data as CatalogListingResponse).data
          : (data as SkinsListResponse).items;

    const skins = list.map(item =>
      isCatalog
        ? mapCatalogItemForCard(item as CatalogSkinItem, game)
        : mapSkinsListItemForCard(item as SkinListItem, game),
    );

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
