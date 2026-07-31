import type { ICatalog } from './types';
import { useGames } from '@/composables/useGames';

export const useGameCatalog = () => {
  const { $request } = useNuxtApp();
  const { selectedGame, gamePrefixForLink } = useGames();
  const { locale } = useI18n();

  const loading = useState<boolean>('catalog-list-loading', () => true);
  const catalogList = useState<ICatalog[]>('catalog-list', () => shallowRef([]));

  const catalogListLinkBySlug = computed(() => {
    const result: Record<string, string> = {};

    for (const catalog of catalogList.value) {
      const parentSlug = `${gamePrefixForLink.value}${catalog.slug}`;
      result[catalog.slug] = parentSlug;
      if (!catalog.children?.length) continue;

      for (const child of catalog.children) {
        result[child.slug] = `${parentSlug}/${child.slug}`;
      }
    }

    return result;
  });

  /*
  const catalogListNameBySlug = computed(() => {
    const result: Record<string, string> = {};
    for (const catalog of catalogList.value) {
      result[catalog.slug] = catalog.name;
      if (!catalog.children?.length) continue;
      for (const child of catalog.children) {
        result[child.slug] = child.name;
      }
    }
    return result;
  });
  */

  const fetchFolders = async () => {
    loading.value = true;
    const { data } = await $request<{ groups: ICatalog[] }>(`/api/v2/${selectedGame.value}/catalog?lang=${locale.value}`, { silent: true });
    catalogList.value = data?.groups.length ? data.groups : [];
    loading.value = false;
  };

  const getCatalogChildBySlug = (slug: string): ICatalog[] => {
    return catalogList.value.find(catalog => catalog.slug === slug)?.children || [];
  };

  return {
    loading,
    selectedGame,
    catalogList,
    catalogListLinkBySlug,
    fetchFolders,
    getCatalogChildBySlug,
  };
};
