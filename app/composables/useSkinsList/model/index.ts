import type { gameTypes } from '@/composables/useGames';
import type {
  CatalogSkinItem,
  ISkin,
} from '@/composables/useSkinItem';

export const addGameForSkin = (skin: ISkin, game: gameTypes): ISkin => {
  skin.game = game;
  return skin;
};

export const mapCatalogItemToSkinItem = (skin: CatalogSkinItem, game: gameTypes): ISkin => {
  return {
    item_id: skin.item_id,
    game,
    name: skin.skin_name,
    market_name: skin.market_name,
    image: skin.image,
    price: skin.max_price,
    auto: false,
    stat_trak: false,
    offer_count: skin.offer_count,
    steam_price: {
      market_name: skin.market_name,
      average: 0,
      popular: false,
      lowest_price: skin.min_price,
      rarity_color: skin.rarity_color,
      localized_name: skin.localized_name,
    },
    inspect_item: {
      floatvalue: 0,
      stickers: skin.stickers,
    },
  };
};

export const MARKETPLACE_SKIN_IMAGES_QUERY = {
  small: { 1920: 135, 1440: 142, 1230: 150, 600: 142, 320: 190 },
  default: { 1920: 157, 1440: 155, 1230: 177, 600: 178, 320: 190 },
  large: { 1920: 200, 1440: 185, 1230: 230, 600: 250, 320: 190 },
};
