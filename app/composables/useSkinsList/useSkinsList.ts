import type { gameTypes } from '@/composables/useGames';

export const useSkinsList = () => {
  const { $request } = useNuxtApp();
  const list = useState<any[]>('skins-list', () => shallowRef([]));
  const loading = useState('skins-loading', () => true);

  const fetchSkins = async (game: gameTypes, query?: any) => {
    list.value = [];
    loading.value = true;
    const { data, error } = await $request<{ items: any[] }>(`/api/${game}/browse?limit=50`, { query });
    if (error) return;
    list.value = data.items;
    loading.value = false;
  };

  const loadMoreSkins = async (game: gameTypes, query?: any) => {
    loading.value = true;
    const { data, error } = await $request<{ items: any[] }>(`/api/${game}/browse?limit=50`, { query });
    if (error) return;
    list.value = [...list.value, ...data.items]; // Push will not work, because it's shallowRef
    loading.value = false;
  };

  return {
    list,
    loading,
    fetchSkins,
    loadMoreSkins,
  };
};
