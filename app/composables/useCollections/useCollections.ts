import type { ICollection, ICollectionResponse } from './types';

export const useCollections = () => {
  const { $request } = useNuxtApp();

  const list = shallowRef<ICollection[]>([]);
  const loading = ref(true);

  const fetchCollections = async () => {
    loading.value = true;
    const { data, error } = await $request<ICollectionResponse>('/api/collections?limit=100');
    if (error || !data.success) return;
    list.value = data.data;
    loading.value = false;
  };

  return {
    list,
    loading,
    fetchCollections,
  };
};
