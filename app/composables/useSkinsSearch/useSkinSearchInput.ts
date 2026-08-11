import type { DropDownExposes } from '@/components/ui';
import type { gameTypes } from '@/composables/useGames';
import { useSkinsSearch } from './useSkinsSearch';

export const useSkinSearchInput = () => {
  const searchRef = ref<DropDownExposes>();
  const {
    searchQuery, list,
    loading, fetchSearchList,
  } = useSkinsSearch();

  const showSearchItemDropDown = () => {
    if (!searchRef.value || !list.value) return;
    searchRef.value?.openDropDown();
  };

  const closeSearchItemDropDown = () => {
    searchRef.value?.closeDropDown();
  };

  const searchItemsHandler = useDebounceFn(async (game: gameTypes) => {
    if (searchQuery.value.length < 3) return;
    if (!searchQuery.value) return list.value = [];

    await fetchSearchList(game);
    showSearchItemDropDown();
  }, 500);

  return {
    searchRef,
    searchQuery,
    list,
    loading,
    fetchSearchList,
    searchItemsHandler,

    showSearchItemDropDown,
    closeSearchItemDropDown,
  };
};
