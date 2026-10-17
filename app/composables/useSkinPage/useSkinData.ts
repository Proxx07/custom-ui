import type { ISkinFetchQuery } from './types';

export const useSkinData = () => {
  // api/v2/csgo/item/awp-dragon-lore-well-worn?id=48943231091&lang=en&skipGraphs=true
  const { $request } = useNuxtApp();
  const loading = useState('skin-page-loading', () => false);
  const item = useState('item', () => shallowRef());
  const recommendeds = useState<any[]>('recommendeds', () => shallowRef([]));

  const fetchItem = async (query: ISkinFetchQuery) => {
    if (loading.value) return;
    loading.value = true;
    const { data } = await $request(`/api/v2/${query.game}/item/${query.name}`);
    /* item.value = data?.item;
    recommendeds.value = data?.recommended_items; */
    loading.value = false;
    // eslint-disable-next-line no-console
    console.log(data);
    // eslint-disable-next-line no-console
    console.log(item.value);
    // eslint-disable-next-line no-console
    console.log(recommendeds.value);
  };

  return {
    loading,
    fetchItem,
  };
};
