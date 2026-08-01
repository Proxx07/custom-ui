import type { ISearchItem } from '../types';
import type { gameTypes } from '@/composables/useGames';
import type { ISkin } from '@/composables/useSkinItem';
import { getExteriorFromName } from '@/composables/useSkinItem';

export const setSkinSearchItemToSkinItem = (skin: ISearchItem, game: gameTypes): ISkin => {
  return {
    game,
    id: skin.name,
    name: skin.name,
    localized_name: skin.localized_name,
    image: skin.img,
    price: skin.lowest_price,
    steamPrice: skin.lowest_price,
    offersCount: skin.api_count,
    rarityColor: skin.rarity_color,
    exterior: getExteriorFromName(skin.name),
  };
};
